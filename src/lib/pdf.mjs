import PDFDocument from "pdfkit";

import { cleanText, slugify } from "./utils.mjs";

function parseStructuredText(text) {
  const source = String(text ?? "").replace(/\r\n/g, "\n").trim();

  if (!source) {
    return [];
  }

  const blocks = [];
  const paragraph = [];
  let listType = null;
  let listItems = [];

  function flushParagraph() {
    if (!paragraph.length) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: cleanText(paragraph.join(" ")),
    });
    paragraph.length = 0;
  }

  function flushList() {
    if (!listType || !listItems.length) {
      return;
    }

    blocks.push({
      type: listType,
      items: listItems.map((item) => cleanText(item)),
    });
    listType = null;
    listItems = [];
  }

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    const unorderedMatch = line.match(/^[-*\u2022]\s+(.*)$/);

    if (orderedMatch) {
      flushParagraph();

      if (listType && listType !== "ordered-list") {
        flushList();
      }

      listType = "ordered-list";
      listItems.push(orderedMatch[1]);
      continue;
    }

    if (unorderedMatch) {
      flushParagraph();

      if (listType && listType !== "unordered-list") {
        flushList();
      }

      listType = "unordered-list";
      listItems.push(unorderedMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function writeHeading(doc, text, level = 1) {
  const fontSize = level === 1 ? 23 : level === 2 ? 17 : 13;
  const topGap = level === 1 ? 0 : 14;

  if (topGap) {
    doc.moveDown(topGap / 14);
  }

  doc
    .fillColor("#17313a")
    .font("Helvetica-Bold")
    .fontSize(fontSize)
    .text(cleanText(text), {
      paragraphGap: level === 1 ? 8 : 6,
    });
}

function writeMetaLine(doc, text) {
  if (!cleanText(text)) {
    return;
  }

  doc
    .fillColor("#61727a")
    .font("Helvetica")
    .fontSize(10)
    .text(cleanText(text), {
      paragraphGap: 6,
    });
}

function writeStructuredText(doc, text) {
  for (const block of parseStructuredText(text)) {
    if (block.type === "paragraph") {
      doc
        .fillColor("#2b4046")
        .font("Helvetica")
        .fontSize(11)
        .text(block.text, {
          paragraphGap: 8,
          lineGap: 2,
        });
      continue;
    }

    if (block.type === "ordered-list") {
      block.items.forEach((item, index) => {
        doc
          .fillColor("#2b4046")
          .font("Helvetica")
          .fontSize(11)
          .text(`${index + 1}. ${item}`, {
            paragraphGap: 4,
            indent: 14,
          });
      });
      doc.moveDown(0.4);
      continue;
    }

    if (block.type === "unordered-list") {
      block.items.forEach((item) => {
        doc
          .fillColor("#2b4046")
          .font("Helvetica")
          .fontSize(11)
          .text(`- ${item}`, {
            paragraphGap: 4,
            indent: 14,
          });
      });
      doc.moveDown(0.4);
    }
  }
}

function writeExample(doc, example, index, i18n) {
  const target = cleanText(example?.target_sentence || example?.target || example?.targetSentence);
  const source = cleanText(example?.source_sentence || example?.source || example?.sourceSentence);
  const description = String(example?.description ?? "").trim();

  if (!target && !source && !description) {
    return;
  }

  writeHeading(doc, `${i18n.text("example")} ${index + 1}`, 3);

  if (target) {
    doc
      .fillColor("#0d5b56")
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(i18n.text("target"), { paragraphGap: 2 });
    doc
      .fillColor("#17313a")
      .font("Helvetica")
      .fontSize(11)
      .text(target, { paragraphGap: 6 });
  }

  if (source) {
    doc
      .fillColor("#0d5b56")
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(i18n.text("meaning"), { paragraphGap: 2 });
    doc
      .fillColor("#17313a")
      .font("Helvetica")
      .fontSize(11)
      .text(source, { paragraphGap: 6 });
  }

  if (description) {
    writeStructuredText(doc, description);
  }
}

export function buildPdfFilename(lesson) {
  return `${slugify(lesson.title)}.pdf`;
}

export function streamLessonPdf(language, lesson, outputStream, i18n) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 54,
    info: {
      Title: lesson.title,
      Author: i18n.text("siteName"),
      Subject: `${language.name} grammar lesson`,
      Keywords: "DIG4EL, grammar, lesson",
    },
  });

  doc.pipe(outputStream);

  writeHeading(doc, lesson.title, 1);
  writeMetaLine(doc, `${language.name} | ${lesson.interfaceLanguage} | ${i18n.statusLabel(lesson.statusKey)}`);
  writeMetaLine(doc, lesson.date || i18n.text("dateNotProvided"));

  if (lesson.introduction) {
    doc.moveDown(0.4);
    writeStructuredText(doc, lesson.introduction);
  }

  lesson.sections.forEach((section, index) => {
    writeHeading(doc, `${index + 1}. ${section.focus}`, 2);
    writeStructuredText(doc, section.description);
    section.examples.forEach((example, exampleIndex) => {
      writeExample(doc, example, exampleIndex, i18n);
    });
  });

  if (lesson.conclusion) {
    writeHeading(doc, i18n.text("keyTakeaway"), 2);
    writeStructuredText(doc, lesson.conclusion);
  }

  if (lesson.translationDrills.length) {
    writeHeading(doc, i18n.text("translationDrills"), 2);
    lesson.translationDrills.forEach((drill, index) => {
      doc
        .fillColor("#0d5b56")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(`${i18n.text("practice")} ${index + 1}`, {
          paragraphGap: 3,
        });

      if (drill.source) {
        doc
          .fillColor("#61727a")
          .font("Helvetica")
          .fontSize(11)
          .text(`${i18n.text("meaning")}: ${drill.source}`, {
            paragraphGap: 2,
          });
      }

      if (drill.target) {
        doc
          .fillColor("#17313a")
          .font("Helvetica")
          .fontSize(11)
          .text(`${i18n.text("target")}: ${drill.target}`, {
            paragraphGap: 8,
          });
      }
    });
  }

  const sourceGroups = Object.entries(lesson.sources || {}).filter(
    ([, values]) => Array.isArray(values) && values.length,
  );

  if (sourceGroups.length) {
    writeHeading(doc, i18n.text("lessonSources"), 2);
    sourceGroups.forEach(([groupName, values]) => {
      doc
        .fillColor("#0d5b56")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(groupName.replace(/_/g, " "), {
          paragraphGap: 4,
        });

      values.forEach((value) => {
        doc
          .fillColor("#2b4046")
          .font("Helvetica")
          .fontSize(11)
          .text(`- ${cleanText(value)}`, {
            paragraphGap: 3,
            indent: 14,
          });
      });

      doc.moveDown(0.4);
    });
  }

  doc.end();
}
