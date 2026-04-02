# www.rodhappi.com

Personal blog by Rodrigo Alegre — AI, product, engineering, and technology from a Latin American perspective.

## Stack

- Vanilla HTML/CSS/JS — zero dependencies
- Custom Node.js build script
- GitHub Pages deployment (auto on push to `main`)

## Build

```bash
node build.js
```

Parses `content/*.md` → generates `posts/*.html` + `index.html`.

## Structure

```
content/        Source Markdown posts
templates/      HTML templates (index.html, post.html)
css/            Stylesheet
js/             Navigation script
media/          Images and assets
build.js        Build pipeline
```

## Content

Posts are written in Markdown with YAML frontmatter:

```yaml
---
title: "Post Title"
date: 2026-02-26
description: "Short description"
featured: true
status: published
---
```

## Live Site

[www.rodhappi.com](https://www.rodhappi.com)
