import { resolve } from "node:path";

import compression from "compression";
import express from "express";

import { detectPreferredLocale, getI18n, normalizeLocale } from "./lib/i18n.mjs";
import { buildPdfFilename, streamLessonPdf } from "./lib/pdf.mjs";
import { findLanguage, findLesson, getLessonLibrary } from "./lib/lessons.mjs";
import {
  renderErrorPage,
  renderHomePage,
  renderLanguagePage,
  renderLessonPage,
  renderNotFoundPage,
} from "./views/render.mjs";

const app = express();
const port = Number(process.env.PORT || 3000);

function parseCookies(header) {
  const cookies = {};

  for (const chunk of String(header ?? "").split(";")) {
    const [name, ...rest] = chunk.trim().split("=");

    if (!name) {
      continue;
    }

    cookies[name] = decodeURIComponent(rest.join("=") || "");
  }

  return cookies;
}

function safeRedirectPath(value) {
  const candidate = String(value || "/").trim();

  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return "/";
  }

  return candidate;
}

function buildView(req) {
  return {
    currentPath: req.originalUrl || "/",
    i18n: req.i18n,
  };
}

function asyncRoute(handler) {
  return function wrappedRoute(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

async function loadLibraryContext(languageSlug, lessonSlug) {
  const library = await getLessonLibrary();
  const language = languageSlug ? findLanguage(library, languageSlug) : null;
  const lesson = lessonSlug && language ? findLesson(language, lessonSlug) : null;

  return {
    library,
    language,
    lesson,
  };
}

app.disable("x-powered-by");
app.use(compression());
app.use((req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  const locale = detectPreferredLocale({
    cookieLocale: cookies.lang,
    acceptLanguage: req.headers["accept-language"],
  });

  req.locale = locale;
  req.i18n = getI18n(locale);
  res.vary("Accept-Language");
  res.setHeader("Content-Language", locale);
  next();
});
app.use(
  express.static(resolve(process.cwd(), "public"), {
    extensions: ["css", "js"],
    etag: true,
    maxAge: "1h",
  }),
);

app.get(
  "/health",
  (req, res) => {
    res.json({ status: "ok", locale: req.locale });
  },
);

app.get("/set-language", (req, res) => {
  const locale = normalizeLocale(req.query.lang);
  const redirectTarget = safeRedirectPath(req.query.redirect);

  if (locale) {
    res.setHeader(
      "Set-Cookie",
      `lang=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`,
    );
  }

  res.redirect(302, redirectTarget);
});

app.get(
  "/",
  asyncRoute(async (req, res) => {
    const library = await getLessonLibrary();
    res.type("html").send(renderHomePage(library, buildView(req)));
  }),
);

app.get(
  "/languages/:languageSlug/:lessonSlug/pdf",
  asyncRoute(async (req, res) => {
    const { language, lesson } = await loadLibraryContext(
      req.params.languageSlug,
      req.params.lessonSlug,
    );

    if (!language || !lesson) {
      res.status(404).type("html").send(renderNotFoundPage(buildView(req)));
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${buildPdfFilename(lesson)}"`,
    );

    streamLessonPdf(language, lesson, res, req.i18n);
  }),
);

app.get(
  "/languages/:languageSlug/:lessonSlug",
  asyncRoute(async (req, res) => {
    const { language, lesson } = await loadLibraryContext(
      req.params.languageSlug,
      req.params.lessonSlug,
    );

    if (!language || !lesson) {
      res.status(404).type("html").send(renderNotFoundPage(buildView(req)));
      return;
    }

    res.type("html").send(renderLessonPage(language, lesson, buildView(req)));
  }),
);

app.get(
  "/languages/:languageSlug",
  asyncRoute(async (req, res) => {
    const { language } = await loadLibraryContext(req.params.languageSlug);

    if (!language) {
      res.status(404).type("html").send(renderNotFoundPage(buildView(req)));
      return;
    }

    res.type("html").send(renderLanguagePage(language, buildView(req)));
  }),
);

app.use((req, res) => {
  res.status(404).type("html").send(renderNotFoundPage(buildView(req)));
});

app.use((error, req, res, _next) => {
  console.error(error);
  res.status(500).type("html").send(renderErrorPage(buildView(req)));
});

app.listen(port, () => {
  console.log(`DIG4EL lessons app listening on http://localhost:${port}`);
});
