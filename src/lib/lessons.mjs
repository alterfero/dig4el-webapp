import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, join, basename, extname } from "node:path";

import {
  cleanText,
  compareText,
  excerpt,
  slugify,
} from "./utils.mjs";

const lessonsRoot = resolve(process.cwd(), "generated_lessons");

function extractInterfaceLanguage(fileName) {
  const matches = [...fileName.matchAll(/\(([^)]+)\)/g)].map((match) =>
    cleanText(match[1]),
  );

  return matches.at(-1) || "Lesson";
}

function extractStatusKey(fileName) {
  if (fileName.includes("unverified_lesson")) {
    return "unverified";
  }

  if (fileName.includes("aggregated_output_sketch")) {
    return "sketch";
  }

  return "lesson";
}

function extractExamples(section) {
  const examples = [];

  if (section?.example && typeof section.example === "object") {
    examples.push(section.example);
  }

  if (Array.isArray(section?.examples)) {
    for (const item of section.examples) {
      if (item && typeof item === "object") {
        examples.push(item);
      }
    }
  }

  return examples;
}

async function readLesson(filePath, languageName, fileName) {
  const [rawContent, fileStats] = await Promise.all([
    readFile(filePath, "utf8"),
    stat(filePath),
  ]);
  const parsed = JSON.parse(rawContent);
  const title = cleanText(parsed.title) || basename(fileName, extname(fileName));
  const introduction = String(parsed.introduction ?? "").trim();
  const conclusion = String(parsed.conclusion ?? "").trim();
  const sections = Array.isArray(parsed.sections)
    ? parsed.sections.map((section) => ({
        focus: cleanText(section?.focus) || "Lesson section",
        description: String(section?.description ?? "").trim(),
        examples: extractExamples(section),
      }))
    : [];
  const translationDrills = Array.isArray(parsed.translation_drills)
    ? parsed.translation_drills
        .map((drill) => ({
          target: cleanText(drill?.target),
          source: cleanText(drill?.source),
        }))
        .filter((drill) => drill.target || drill.source)
    : [];
  const sourceGroups =
    parsed.sources && typeof parsed.sources === "object" ? parsed.sources : {};

  return {
    title,
    introduction,
    conclusion,
    sections,
    translationDrills,
    sources: sourceGroups,
    date: cleanText(parsed.date),
    version: cleanText(parsed.version),
    interfaceLanguage: extractInterfaceLanguage(fileName),
    statusKey: extractStatusKey(fileName),
    fileName,
    filePath,
    summary: excerpt(parsed.introduction || parsed.conclusion || title, 200),
    sectionCount: sections.length,
    drillCount: translationDrills.length,
    updatedAt: fileStats.mtime.toISOString(),
  };
}

function attachLessonSlugs(lessons) {
  const usedSlugs = new Set();

  return lessons.map((lesson) => {
    const baseSlug = slugify(lesson.title);
    let slug = baseSlug;
    let suffix = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(slug);

    return {
      ...lesson,
      slug,
      href: `/languages/${lesson.languageSlug}/${slug}`,
      pdfHref: `/languages/${lesson.languageSlug}/${slug}/pdf`,
    };
  });
}

function buildLanguageSummary(name, lessons) {
  const interfaceLanguages = [...new Set(lessons.map((lesson) => lesson.interfaceLanguage))]
    .filter(Boolean)
    .sort(compareText);

  return {
    name,
    slug: slugify(name),
    lessonCount: lessons.length,
    interfaceLanguages,
  };
}

export async function getLessonLibrary() {
  let languageEntries = [];

  try {
    languageEntries = await readdir(lessonsRoot, { withFileTypes: true });
  } catch {
    return {
      languages: [],
      lessonsRoot,
    };
  }

  const languages = await Promise.all(
    languageEntries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map(async (entry) => {
        const languageName = entry.name;
        const languageSlug = slugify(languageName);
        const directoryPath = join(lessonsRoot, languageName);
        const fileEntries = await readdir(directoryPath, { withFileTypes: true });
        const jsonFiles = fileEntries
          .filter((fileEntry) => fileEntry.isFile() && extname(fileEntry.name).toLowerCase() === ".json")
          .map((fileEntry) => fileEntry.name)
          .sort(compareText);

        const lessons = [];

        for (const fileName of jsonFiles) {
          const filePath = join(directoryPath, fileName);

          try {
            const lesson = await readLesson(filePath, languageName, fileName);
            lessons.push({
              ...lesson,
              languageName,
              languageSlug,
            });
          } catch (error) {
            console.warn(`Skipping unreadable lesson file: ${filePath}`);
            console.warn(error);
          }
        }

        lessons.sort((left, right) => compareText(left.title, right.title));

        const lessonsWithSlugs = attachLessonSlugs(lessons);
        const summary = buildLanguageSummary(languageName, lessonsWithSlugs);

        return {
          ...summary,
          lessons: lessonsWithSlugs,
        };
      }),
  );

  languages.sort((left, right) => compareText(left.name, right.name));

  return {
    languages,
    lessonsRoot,
  };
}

export function findLanguage(library, languageSlug) {
  return library.languages.find((language) => language.slug === languageSlug) ?? null;
}

export function findLesson(language, lessonSlug) {
  return language?.lessons.find((lesson) => lesson.slug === lessonSlug) ?? null;
}
