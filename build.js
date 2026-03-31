#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// --- Utility ---

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --- Frontmatter Parser (Task 1.2) ---

function parseFrontmatter(content, filePath) {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') {
    return { meta: defaults(filePath), body: content };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { meta: defaults(filePath), body: content };
  }

  const meta = defaults(filePath);
  const yamlLines = lines.slice(1, endIndex);

  for (const line of yamlLines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (!match) continue;
    const key = match[1].trim();
    let value = match[2].trim();

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key === 'featured') {
      meta.featured = value === 'true';
    } else if (key === 'status') {
      meta.status = value === 'draft' ? 'draft' : 'published';
    } else if (key === 'date') {
      const parsed = new Date(value + 'T00:00:00');
      if (isNaN(parsed.getTime())) {
        console.warn(`  ⚠ Invalid date "${value}" in ${path.basename(filePath)}, using file mtime`);
        meta.date = fs.statSync(filePath).mtime;
      } else {
        meta.date = parsed;
      }
      meta.dateStr = formatDate(meta.date);
      meta.dateShort = formatDateShort(meta.date);
    } else {
      meta[key] = value;
    }
  }

  // Escape frontmatter values used in HTML
  meta.title = escapeHtml(meta.title);
  meta.description = escapeHtml(meta.description || '');
  meta.dateStr = escapeHtml(meta.dateStr || formatDate(meta.date));
  meta.dateShort = escapeHtml(meta.dateShort || formatDateShort(meta.date));
  meta.dateCard = escapeHtml(formatDateCard(meta.date));
  const rawThumb = meta.thumbnail || '';
  const SAFE_THUMB = /^(https?:\/\/|\/|\.\/|\.\.\/|media\/)/i;
  meta.thumbnail = rawThumb && SAFE_THUMB.test(rawThumb) ? escapeHtml(rawThumb) : '';

  const body = lines.slice(endIndex + 1).join('\n');
  meta.readingTime = calculateReadingTime(body);
  return { meta, body };
}

function defaults(filePath) {
  const slug = path.basename(filePath, '.md');
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  let date;
  try {
    date = fs.statSync(filePath).mtime;
  } catch {
    date = new Date();
  }
  return {
    title,
    date,
    dateStr: formatDate(date),
    dateShort: formatDateShort(date),
    dateCard: formatDateCard(date),
    description: '',
    featured: false,
    status: 'published',
    thumbnail: '',
    readingTime: 1,
  };
}

function formatDate(date) {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

function formatDateCard(date) {
  const months = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function calculateReadingTime(markdownBody) {
  const text = markdownBody.trim();
  if (!text) return 1;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDateShort(date) {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const d = date instanceof Date ? date : new Date(date);
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

// --- Markdown Parser (Task 1.1) ---

function parseMarkdown(src) {
  const lines = src.split('\n');
  const out = [];
  let inCodeBlock = false;
  let codeBlockContent = [];
  let inList = false;
  let listType = '';
  let listItems = [];
  let inBlockquote = false;
  let blockquoteLines = [];

  function flushList() {
    if (!inList) return;
    const tag = listType === 'ul' ? 'ul' : 'ol';
    out.push(`<${tag}>`);
    for (const item of listItems) {
      out.push(`<li>${parseInline(item)}</li>`);
    }
    out.push(`</${tag}>`);
    inList = false;
    listItems = [];
  }

  function flushBlockquote() {
    if (!inBlockquote) return;
    const inner = parseMarkdown(blockquoteLines.join('\n'));
    out.push(`<blockquote>${inner}</blockquote>`);
    inBlockquote = false;
    blockquoteLines = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        out.push(`<pre><code>${escapeHtml(codeBlockContent.join('\n'))}</code></pre>`);
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        flushList();
        flushBlockquote();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      flushList();
      flushBlockquote();
      continue;
    }

    // Blockquote
    if (line.match(/^>\s?/)) {
      flushList();
      inBlockquote = true;
      blockquoteLines.push(line.replace(/^>\s?/, ''));
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Horizontal rule
    if (line.match(/^(---|\*\*\*|___)\s*$/)) {
      flushList();
      out.push('<hr>');
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      out.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // @video(url) directive
    const videoMatch = line.match(/^@video\((.+)\)$/);
    if (videoMatch) {
      flushList();
      const url = videoMatch[1].trim();
      const embedUrl = toEmbedUrl(url);
      if (embedUrl) {
        out.push(`<div class="video-embed"><iframe src="${escapeHtml(embedUrl)}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`);
      } else {
        out.push(`<p class="video-error">Video no disponible: URL no válida</p>`);
      }
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (inList && listType !== 'ul') flushList();
      inList = true;
      listType = 'ul';
      listItems.push(ulMatch[1]);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (inList && listType !== 'ol') flushList();
      inList = true;
      listType = 'ol';
      listItems.push(olMatch[1]);
      continue;
    }

    // Paragraph
    flushList();
    out.push(`<p>${parseInline(line)}</p>`);
  }

  // Flush remaining
  if (inCodeBlock) {
    out.push(`<pre><code>${escapeHtml(codeBlockContent.join('\n'))}</code></pre>`);
  }
  flushList();
  flushBlockquote();

  return out.join('\n');
}

function parseInline(text) {
  // Images (before links to avoid conflict)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) =>
    `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`);

  // Links (block javascript: and data: URIs)
  const SAFE_URL = /^(https?:\/\/|\/|\.\/|\.\.\/|#|mailto:)/i;
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeUrl = SAFE_URL.test(url) ? url : '#';
    const isExternal = safeUrl.startsWith('http');
    const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${escapeHtml(safeUrl)}"${attrs}>${parseInline(label)}</a>`;
  });

  // Bold + italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

  return text;
}

function toEmbedUrl(url) {
  // YouTube
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  // Vimeo
  match = url.match(/vimeo\.com\/(\d+)/);
  if (match) return `https://player.vimeo.com/video/${match[1]}`;

  // Direct video URL (mp4, webm)
  if (url.match(/\.(mp4|webm)$/i)) return url;

  return null;
}

// --- Template Engine (Task 1.3) ---

function renderTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return vars[key] !== undefined ? vars[key] : '';
  });
}

// --- Build Pipeline ---

function build() {
  const rootDir = __dirname;
  const contentDir = path.join(rootDir, 'content');
  const postsDir = path.join(rootDir, 'posts');
  const templatesDir = path.join(rootDir, 'templates');

  // Ensure directories exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  // Clean old generated files (idempotency — FR-18)
  const oldPosts = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));
  for (const file of oldPosts) {
    fs.unlinkSync(path.join(postsDir, file));
  }
  const indexPath = path.join(rootDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
  }

  // Read content files
  const mdFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

  if (mdFiles.length === 0) {
    console.warn('  ⚠ No content files found.');
    // Generate empty homepage
    const indexTemplate = fs.readFileSync(path.join(templatesDir, 'index.html'), 'utf-8');
    const html = renderTemplate(indexTemplate, {
      featured_section: '',
      posts: '',
    });
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log('✓ 0 post(s) built successfully.');
    return;
  }

  // Parse all posts
  const slugsSeen = new Set();
  const posts = [];

  for (const file of mdFiles) {
    const filePath = path.join(contentDir, file);
    const slug = path.basename(file, '.md');

    if (slugsSeen.has(slug)) {
      console.warn(`  ⚠ Duplicate slug "${slug}", skipping ${file}`);
      continue;
    }
    slugsSeen.add(slug);

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(raw, filePath);
    const content = parseMarkdown(body.trim());

    if (meta.status === 'draft') {
      console.log(`  ⊘ ${file} (draft, skipped)`);
      continue;
    }

    posts.push({ slug, meta, content });
  }

  // Sort by date descending
  posts.sort((a, b) => b.meta.date - a.meta.date);

  // Current-month filtering for Escritos (FR-3)
  const now = new Date();
  const buildMonth = now.getMonth();
  const buildYear = now.getFullYear();

  const escritosPosts = posts.filter(p =>
    p.meta.date.getMonth() === buildMonth && p.meta.date.getFullYear() === buildYear
  );
  const archivePosts = posts.filter(p =>
    p.meta.date.getMonth() !== buildMonth || p.meta.date.getFullYear() !== buildYear
  );

  // Read templates
  const postTemplate = fs.readFileSync(path.join(templatesDir, 'post.html'), 'utf-8');
  const indexTemplate = fs.readFileSync(path.join(templatesDir, 'index.html'), 'utf-8');

  // Generate individual post pages (FR-4)
  for (const post of posts) {
    const descriptionHtml = post.meta.description
      ? `<p class="post-description">${escapeHtml(post.meta.description)}</p>`
      : '';
    const html = renderTemplate(postTemplate, {
      title: post.meta.title,
      date: post.meta.dateStr,
      description: post.meta.description,
      description_html: descriptionHtml,
      content: post.content,
    });
    fs.writeFileSync(path.join(postsDir, `${post.slug}.html`), html, 'utf-8');
  }

  // Shared post-card renderer
  const readingTimeLabel = (minutes) => minutes === 1 ? '1 minuto' : `${minutes} minutos`;
  function renderPostCards(posts) {
    if (posts.length === 0) return '';
    return posts.map(post => {
      const thumb = post.meta.thumbnail
        ? `<img src="${post.meta.thumbnail}" alt="" class="post-card-thumb" loading="lazy">`
        : '';
      return `<a href="posts/${post.slug}.html" class="post-card">
      ${thumb}<div class="post-card-body">
        <span class="post-card-date">${post.meta.dateCard}</span>
        <span class="post-card-title">${post.meta.title}</span>
        <span class="post-card-readtime">${readingTimeLabel(post.meta.readingTime)}</span>
      </div>
    </a>`;
    }).join('\n');
  }

  const archiveHtml = renderPostCards(archivePosts);
  const featuredSection = renderPostCards(escritosPosts);

  // Generate homepage (FR-5)
  const homeHtml = renderTemplate(indexTemplate, {
    featured_section: featuredSection,
    posts: archiveHtml,
  });
  fs.writeFileSync(indexPath, homeHtml, 'utf-8');

  console.log(`✓ ${posts.length} post(s) built successfully.`);
}

build();
