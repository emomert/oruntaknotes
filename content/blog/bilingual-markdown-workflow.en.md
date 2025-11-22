---
title: Bilingual Markdown Workflow
excerpt: How I keep Turkish and English drafts aligned in one markdown-first flow while linking everything together.
readTimeMinutes: "6"
publishedAt: 2025-01-12
tagsEn:
  - markdown
  - bilingual
tagsTr:
  - markdown
  - çift-dil
---
# Bilingual Markdown Workflow

I keep Turkish and English drafts side-by-side so I never lose nuance. Each language lives in its own file, but the slug stays the same.

## Folder layout

- `content/blog/<slug>.en.md`
- `content/blog/<slug>.tr.md`
- Shared assets live under `uploads/`

## Why wiki-links

I use Obsidian-style links to jump between posts while drafting. Try clicking [[shipping-in-public]] or [[field-notes-from-cappadocia]] from this page.

## Embedding assets

Images can come from uploads or the image API. This sketch is referenced with wiki image syntax, so it is served via `/api/images/:filename`:

![[journey-sketch.svg]]

Here is the same asset via a plain path:

![Journey sketch](/uploads/journey-sketch.svg)

And here is a PNG thumbnail (not SVG) to show mixed formats:

![Learning map board PNG](/uploads/learning-map-board.png)

## Sample code block

```bash
npm install
npx tsx server/index-dev.ts
open http://localhost:5000
```

## Publishing checklist

1. Write the English draft.
2. Mirror it into Turkish.
3. Add excerpts and read time (strings).
4. Drop assets into `uploads/`.
5. Use short slugs (`bilingual-markdown-workflow`).
