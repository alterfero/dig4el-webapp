# DIG4EL Lessons Webapp

A lightweight, mobile-first web application for browsing DIG4EL grammar lessons stored as JSON in `generated_lessons/<Language>/`.

The app is designed for:

- low bandwidth
- broad browser compatibility
- strong phone UX
- simple Railway deployment
- on-demand PDF export without storing PDF files

## Architecture

This project uses a content-first Node architecture instead of a heavy client app:

- `Express` serves fully rendered HTML pages for fast first loads and simple URLs.
- `compression` keeps responses small.
- `pdfkit` generates lesson PDFs on demand from the JSON source.
- Handwritten CSS provides the UI, which keeps the runtime small and easy to maintain.

Why this fits the problem well:

- lessons already live on the filesystem
- users mainly read content rather than manipulate app state
- server-rendered HTML is friendlier to weaker connections than a large SPA bundle
- Railway can run this as a simple Node service

## Content Model

The app automatically discovers languages and lessons from the filesystem:

```text
generated_lessons/
  Mwotlap/
    some_lesson.json
  Tahitian/
    another_lesson.json
```

Behavior:

- each folder inside `generated_lessons` becomes a language page
- each `.json` file becomes a lesson
- non-JSON files are ignored for now
- lesson URLs are generated from the lesson title

## Routes

- `/` home page with DIG4EL intro and language chooser
- `/languages/:languageSlug` lesson list for one language
- `/languages/:languageSlug/:lessonSlug` lesson reader page
- `/languages/:languageSlug/:lessonSlug/pdf` generated PDF download
- `/health` health check for Railway

## Local Development

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Or run it without watch mode:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Railway Deployment

Railway can deploy this as a standard Node service.

Recommended settings:

- Start command: `npm start`
- Node version: `20+`
- `railway.toml` is included to make the start command and `/health` check explicit

The server reads `PORT` from the environment automatically, so no extra config is required.

## PDF Strategy

You asked whether PDFs should be stored. For this app, the better default is no.

Current approach:

- keep JSON as the source of truth
- generate the PDF only when the user requests it
- avoid duplicate storage and stale exported files

This keeps maintenance low and ensures the downloaded PDF always matches the latest lesson JSON.

## Project Structure

```text
public/
  app.css
  app.js
src/
  lib/
    lessons.mjs
    pdf.mjs
    utils.mjs
  views/
    render.mjs
  server.mjs
generated_lessons/
  ...
```

## Notes

- The interface is intentionally minimalist and mobile-first.
- The current DIG4EL copy on the home page is generic and safe. If you want, we can replace it with more specific project language later.
- If you eventually want search, filters, analytics, or multilingual UI controls, this structure can support them without a rewrite.
