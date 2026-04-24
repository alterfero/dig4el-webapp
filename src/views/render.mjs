import { cleanText, escapeHtml, formatSourceLabel } from "../lib/utils.mjs";

function renderInlineText(value) {
  const source = String(value ?? "");
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let html = "";

  for (const match of source.matchAll(boldPattern)) {
    const [fullMatch, boldText] = match;
    const matchIndex = match.index ?? 0;

    html += escapeHtml(source.slice(lastIndex, matchIndex));
    html += `<strong>${escapeHtml(boldText)}</strong>`;
    lastIndex = matchIndex + fullMatch.length;
  }

  html += escapeHtml(source.slice(lastIndex));

  return html;
}

function renderLayout({
  title,
  description,
  content,
  pageClass = "",
  currentPath = "/",
  showHeader = true,
  i18n,
}) {
  const pageTitle = title ? `${title} | ${i18n.text("siteName")}` : i18n.text("siteName");
  const safeDescription = escapeHtml(description || i18n.text("metaDescription"));
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="${escapeHtml(i18n.locale)}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="description" content="${safeDescription}">
    <meta name="theme-color" content="#f6efe3">
    <title>${escapeHtml(pageTitle)}</title>
    <link rel="preload" href="/app.css" as="style">
    <link rel="stylesheet" href="/app.css">
    <script type="module" src="/app.js"></script>
  </head>
  <body class="${escapeHtml(pageClass)}">
    <a class="skip-link" href="#main-content">${escapeHtml(i18n.text("skipToContent"))}</a>
    ${renderLocaleBar(i18n, currentPath, !showHeader)}
    ${showHeader ? renderHeader(i18n) : ""}
    <main id="main-content" class="site-shell page">
      ${content}
    </main>
    <footer class="site-shell site-footer">
      <p>${escapeHtml(i18n.text("footerLine1"))}</p>
      <p class="footer-note">${escapeHtml(i18n.text("footerLine2"))} ${year}</p>
    </footer>
  </body>
</html>`;
}

function renderLocaleBar(i18n, currentPath, showBrand) {
  const currentLocale = i18n.locales.find((locale) => locale.code === i18n.locale) ?? i18n.locales[0];

  return `<section class="utility-wrap">
    <div class="site-shell utility-bar ${showBrand ? "" : "utility-bar-compact"}">
      ${showBrand ? `<a class="utility-brand" href="/">
        <span class="brand-mark">D</span>
        <span>
          <strong>${escapeHtml(i18n.text("siteName"))}</strong>
          <span class="brand-subtitle">${escapeHtml(i18n.text("siteTagline"))}</span>
        </span>
      </a>` : ""}
      <details class="locale-picker" data-locale-picker>
        <summary class="locale-trigger" aria-label="${escapeHtml(i18n.text("localeLabel"))}">
          <span class="locale-trigger-copy">
            <span class="locale-trigger-kicker">${escapeHtml(i18n.text("localeLabel"))}</span>
            <strong>${escapeHtml(currentLocale.label)}</strong>
          </span>
          <span class="locale-trigger-code">${escapeHtml(currentLocale.code.toUpperCase())}</span>
        </summary>
        <div class="locale-menu" role="list">
          ${i18n.locales
            .map((locale) => {
              const href = `/set-language?lang=${encodeURIComponent(locale.code)}&redirect=${encodeURIComponent(currentPath)}`;
              const activeClass = locale.code === i18n.locale ? " locale-option-active" : "";

              return `<a class="locale-option${activeClass}" href="${escapeHtml(href)}" role="listitem">
                <span class="locale-option-name">${escapeHtml(locale.label)}</span>
                <span class="locale-option-code">${escapeHtml(locale.code.toUpperCase())}</span>
              </a>`;
            })
            .join("")}
        </div>
      </details>
    </div>
  </section>`;
}

function renderHeader(i18n) {
  return `<header class="site-header">
    <div class="site-shell header-bar">
      <a class="brand" href="/">
        <span class="brand-mark">D</span>
        <span>
          <strong>${escapeHtml(i18n.text("siteName"))}</strong>
          <span class="brand-subtitle">${escapeHtml(i18n.text("siteTagline"))}</span>
        </span>
      </a>
      <nav class="site-nav" aria-label="${escapeHtml(i18n.text("navHome"))}">
        <a class="nav-link" href="/">${escapeHtml(i18n.text("navHome"))}</a>
        <a class="nav-link" href="/#languages">${escapeHtml(i18n.text("navLanguages"))}</a>
      </nav>
    </div>
  </header>`;
}

function renderChip(text, tone = "default") {
  return `<span class="chip chip-${tone}">${escapeHtml(text)}</span>`;
}

function renderButton(href, label, style = "primary", attrs = "") {
  return `<a class="button button-${style}" href="${escapeHtml(href)}" ${attrs}>${escapeHtml(label)}</a>`;
}

function renderStructuredText(text, className = "prose") {
  const source = String(text ?? "").replace(/\r\n/g, "\n").trim();

  if (!source) {
    return "";
  }

  const blocks = [];
  const paragraph = [];
  let listType = null;
  let listItems = [];

  function flushParagraph() {
    if (!paragraph.length) {
      return;
    }

    const merged = cleanText(paragraph.join(" "));
    blocks.push(`<p>${renderInlineText(merged)}</p>`);
    paragraph.length = 0;
  }

  function flushList() {
    if (!listItems.length || !listType) {
      return;
    }

    const items = listItems.map((item) => `<li>${renderInlineText(cleanText(item))}</li>`).join("");
    blocks.push(`<${listType}>${items}</${listType}>`);
    listItems = [];
    listType = null;
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

      if (listType && listType !== "ol") {
        flushList();
      }

      listType = "ol";
      listItems.push(orderedMatch[1]);
      continue;
    }

    if (unorderedMatch) {
      flushParagraph();

      if (listType && listType !== "ul") {
        flushList();
      }

      listType = "ul";
      listItems.push(unorderedMatch[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return `<div class="${escapeHtml(className)}">${blocks.join("")}</div>`;
}

function renderBreadcrumbs(items, i18n) {
  const links = items
    .map((item) => {
      if (!item.href) {
        return `<span aria-current="page">${escapeHtml(item.label)}</span>`;
      }

      return `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
    })
    .join("<span class=\"breadcrumb-separator\">/</span>");

  return `<nav class="breadcrumbs" aria-label="${escapeHtml(i18n.text("navLanguages"))}">${links}</nav>`;
}

function renderLanguageCards(languages, i18n) {
  if (!languages.length) {
    return `<section class="panel empty-panel">
      <h2>${escapeHtml(i18n.text("noLessonsFoundYet"))}</h2>
      <p>${escapeHtml(i18n.text("addJsonFiles"))}</p>
    </section>`;
  }

  return `<section id="languages" class="language-grid">
    ${languages
      .map(
        (language) => `<article class="language-card">
          <div class="language-card-top">
            ${renderChip(i18n.lessonCount(language.lessonCount), "soft")}
            ${language.interfaceLanguages.length ? renderChip(language.interfaceLanguages.join(" / "), "default") : ""}
          </div>
          <h2>${renderInlineText(language.name)}</h2>
          <p>${renderInlineText(i18n.text("languageCardDescription", language.name))}</p>
          <div class="language-card-footer">
            ${renderButton(`/languages/${language.slug}`, i18n.text("browseLessons"), "dark")}
          </div>
        </article>`,
      )
      .join("")}
  </section>`;
}

function renderLessonListing(language, i18n) {
  if (!language.lessons.length) {
    return `<section class="panel empty-panel">
      <h2>${escapeHtml(i18n.text("noJsonLessons"))}</h2>
      <p>${escapeHtml(i18n.text("noJsonLessonsDesc"))}</p>
    </section>`;
  }

  return `<section class="lesson-grid">
    ${language.lessons
      .map(
        (lesson) => `<article class="lesson-listing">
          <div class="lesson-listing-top">
            ${renderChip(i18n.statusLabel(lesson.statusKey), lesson.statusKey === "unverified" ? "warm" : "default")}
            ${renderChip(lesson.interfaceLanguage, "soft")}
          </div>
          <h2><a href="${escapeHtml(lesson.href)}">${renderInlineText(lesson.title)}</a></h2>
          <p>${renderInlineText(lesson.summary || i18n.text("lessonSummaryFallback"))}</p>
          <div class="chip-row">
            ${renderChip(i18n.sectionCount(lesson.sectionCount))}
            ${renderChip(i18n.drillCount(lesson.drillCount))}
            ${lesson.version ? renderChip(`v${lesson.version}`) : ""}
          </div>
          <div class="lesson-listing-footer">
            <span class="meta-inline">${renderInlineText(lesson.date || i18n.text("dateNotProvided"))}</span>
            ${renderButton(lesson.href, i18n.text("openLesson"), "primary")}
          </div>
        </article>`,
      )
      .join("")}
  </section>`;
}

function renderExample(example, index, i18n) {
  const target = cleanText(example?.target_sentence || example?.target || example?.targetSentence);
  const source = cleanText(example?.source_sentence || example?.source || example?.sourceSentence);
  const description = String(example?.description ?? "").trim();

  if (!target && !source && !description) {
    return "";
  }

  return `<div class="example-card">
    <div class="example-label">${escapeHtml(i18n.text("example"))} ${index + 1}</div>
    <div class="example-grid">
      ${target ? `<div><h3>${escapeHtml(i18n.text("target"))}</h3><p class="example-sentence">${renderInlineText(target)}</p></div>` : ""}
      ${source ? `<div><h3>${escapeHtml(i18n.text("meaning"))}</h3><p>${renderInlineText(source)}</p></div>` : ""}
    </div>
    ${description ? renderStructuredText(description, "prose compact-prose") : ""}
  </div>`;
}

function renderSections(lesson, i18n) {
  if (!lesson.sections.length) {
    return "";
  }

  return `<section class="section-stack">
    ${lesson.sections
      .map(
        (section, index) => `<article class="section-card">
          <div class="section-header">
            <div class="section-index">${String(index + 1).padStart(2, "0")}</div>
            <div>
              <p class="section-kicker">${escapeHtml(i18n.text("focus"))}</p>
              <h2>${renderInlineText(section.focus || i18n.text("lessonSectionFallback"))}</h2>
            </div>
          </div>
          ${renderStructuredText(section.description)}
          ${section.examples.length ? `<div class="example-stack">${section.examples.map((example, exampleIndex) => renderExample(example, exampleIndex, i18n)).join("")}</div>` : ""}
        </article>`,
      )
      .join("")}
  </section>`;
}

function renderTranslationDrills(lesson, i18n) {
  if (!lesson.translationDrills.length) {
    return "";
  }

  return `<section class="panel">
    <div class="panel-heading">
      <div>
        <p class="section-kicker">${escapeHtml(i18n.text("practice"))}</p>
        <h2>${escapeHtml(i18n.text("translationDrills"))}</h2>
      </div>
      ${renderChip(i18n.itemCount(lesson.translationDrills.length), "soft")}
    </div>
    <div class="drill-list">
      ${lesson.translationDrills
        .map(
          (drill, index) => `<article class="drill-item">
            <span class="drill-index">${String(index + 1).padStart(2, "0")}</span>
            <p class="drill-source">${renderInlineText(drill.source || i18n.text("sourceTextMissing"))}</p>
            <p class="drill-target">${renderInlineText(drill.target || i18n.text("targetTextMissing"))}</p>
          </article>`,
        )
        .join("")}
    </div>
  </section>`;
}

function renderSources(lesson, i18n) {
  const groups = Object.entries(lesson.sources || {}).filter(
    ([, values]) => Array.isArray(values) && values.length,
  );

  if (!groups.length) {
    return "";
  }

  return `<section class="panel">
    <div class="panel-heading">
      <div>
        <p class="section-kicker">${escapeHtml(i18n.text("references"))}</p>
        <h2>${escapeHtml(i18n.text("lessonSources"))}</h2>
      </div>
    </div>
    <div class="source-groups">
      ${groups
        .map(
          ([groupName, values]) => `<section class="source-group">
            <h3>${renderInlineText(formatSourceLabel(groupName))}</h3>
            <div class="source-pill-list">
              ${values.map((value) => `<span class="source-pill">${renderInlineText(value)}</span>`).join("")}
            </div>
          </section>`,
        )
        .join("")}
    </div>
  </section>`;
}

export function renderHomePage(library, view) {
  const { i18n, currentPath } = view;

  return renderLayout({
    title: "",
    currentPath,
    pageClass: "page-home",
    showHeader: false,
    i18n,
    content: `<section class="panel panel-tight">
      ${renderLanguageCards(library.languages, i18n)}
    </section>
    <section id="about-dig4el" class="panel info-panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">${escapeHtml(i18n.text("aboutDig4el"))}</p>
          <h2>${renderInlineText(i18n.text("aboutTitle"))}</h2>
        </div>
      </div>
      <div class="two-column">
        <div>
          <p>${renderInlineText(i18n.text("aboutBody1"))}</p>
          <p>${renderInlineText(i18n.text("aboutBody2"))}</p>
        </div>
        <div class="note-card">
          <p class="note-title">${escapeHtml(i18n.text("whyDesign"))}</p>
          <ul>
            ${i18n.text("designReasons").map((reason) => `<li>${renderInlineText(reason)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>`,
  });
}

export function renderLanguagePage(language, view) {
  const { i18n, currentPath } = view;

  return renderLayout({
    title: language.name,
    description: i18n.text("browseLanguageDescription", language.name),
    currentPath,
    pageClass: "page-language",
    i18n,
    content: `${renderBreadcrumbs([
      { label: i18n.text("navHome"), href: "/" },
      { label: language.name },
    ], i18n)}
    <section class="panel panel-tight">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">${escapeHtml(i18n.text("lessons"))}</p>
          <h2>${renderInlineText(i18n.text("languageAvailability", language.lessonCount))}</h2>
        </div>
      </div>
      ${renderLessonListing(language, i18n)}
    </section>`,
  });
}

export function renderLessonPage(language, lesson, view) {
  const { i18n, currentPath } = view;

  return renderLayout({
    title: lesson.title,
    description: lesson.summary,
    currentPath,
    pageClass: "page-lesson",
    i18n,
    content: `${renderBreadcrumbs([
      { label: i18n.text("navHome"), href: "/" },
      { label: language.name, href: `/languages/${language.slug}` },
      { label: lesson.title },
    ], i18n)}
    <section class="hero hero-lesson">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(language.name)}</p>
        <h1>${renderInlineText(lesson.title)}</h1>
        <p class="hero-text">${renderInlineText(lesson.summary || lesson.introduction || i18n.text("readLessonFallback"))}</p>
        <div class="chip-row">
          ${renderChip(i18n.statusLabel(lesson.statusKey), lesson.statusKey === "unverified" ? "warm" : "default")}
          ${renderChip(lesson.interfaceLanguage, "soft")}
          ${renderChip(i18n.sectionCount(lesson.sectionCount))}
          ${renderChip(i18n.drillCount(lesson.drillCount))}
          ${lesson.version ? renderChip(`v${lesson.version}`) : ""}
        </div>
      </div>
      <div class="lesson-actions">
        ${renderButton(`/languages/${language.slug}`, i18n.text("backToLessons"), "ghost")}
        ${renderButton(lesson.pdfHref, i18n.text("downloadPdf"), "dark")}
        <button
          class="button button-primary"
          type="button"
          data-share
          data-share-url="${escapeHtml(lesson.href)}"
          data-share-title="${escapeHtml(lesson.title)}"
          data-default-label="${escapeHtml(i18n.text("shareLesson"))}"
          data-copied-label="${escapeHtml(i18n.text("linkCopied"))}"
        >
          ${escapeHtml(i18n.text("shareLesson"))}
        </button>
      </div>
      <div class="meta-strip">
        <span>${renderInlineText(lesson.date || i18n.text("dateNotProvided"))}</span>
        <span>${renderInlineText(lesson.fileName)}</span>
      </div>
    </section>
    ${lesson.introduction ? `<section class="panel">${renderStructuredText(lesson.introduction)}</section>` : ""}
    ${renderSections(lesson, i18n)}
    ${lesson.conclusion ? `<section class="panel conclusion-panel">
      <div class="panel-heading">
        <div>
          <p class="section-kicker">${escapeHtml(i18n.text("wrapUp"))}</p>
          <h2>${escapeHtml(i18n.text("keyTakeaway"))}</h2>
        </div>
      </div>
      ${renderStructuredText(lesson.conclusion)}
    </section>` : ""}
    ${renderTranslationDrills(lesson, i18n)}
    ${renderSources(lesson, i18n)}`,
  });
}

export function renderNotFoundPage(view) {
  const { i18n, currentPath } = view;

  return renderLayout({
    title: i18n.text("notFound"),
    description: i18n.text("notFoundDescription"),
    currentPath,
    pageClass: "page-not-found",
    i18n,
    content: `<section class="panel empty-panel">
      <p class="eyebrow">404</p>
      <h1>${escapeHtml(i18n.text("notFoundTitle"))}</h1>
      <p>${escapeHtml(i18n.text("notFoundDescription"))}</p>
      ${renderButton("/", i18n.text("returnHome"), "dark")}
    </section>`,
  });
}

export function renderErrorPage(view) {
  const { i18n, currentPath } = view;

  return renderLayout({
    title: i18n.text("serverError"),
    description: i18n.text("serverErrorDescription"),
    currentPath,
    pageClass: "page-error",
    i18n,
    content: `<section class="panel empty-panel">
      <p class="eyebrow">500</p>
      <h1>${escapeHtml(i18n.text("serverErrorTitle"))}</h1>
      <p>${escapeHtml(i18n.text("serverErrorDescription"))}</p>
      ${renderButton("/", i18n.text("returnHome"), "dark")}
    </section>`,
  });
}
