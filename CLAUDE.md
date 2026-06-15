# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static institutional website for **NCE SARL**, a BTP/construction company based in Libreville, Gabon. Pure HTML/CSS/JS — no build step, no framework, no package manager.

## Running the site

Open any `.html` file directly in a browser. No server required for local development; all assets are relative paths.

For deployment (static hosting only):

```bash
# Vercel CLI
vercel deploy

# Netlify: drag-and-drop the folder onto app.netlify.com

# GitHub Pages: push to main branch
```

## Architecture

### Pages

Five standalone HTML files at the root: `index.html`, `a-propos.html`, `services.html`, `realisations.html`, `contact.html`. Each page contains only a `<header id="site-header">` and `<footer id="site-footer">` shell — the actual markup is injected at runtime by `js/components.js`.

### JavaScript modules (loaded manually via `<script>` tags)

| File | Responsibility |
|------|---------------|
| `js/components.js` | Injects header + footer HTML into `#site-header` / `#site-footer`. Contains `NAV_LINKS` — the **single source of truth** for navigation items and active-page detection. |
| `js/main.js` | Sticky header scroll, burger menu toggle, IntersectionObserver scroll animations, animated stats counter (`data-count` / `data-suffix` attributes). |
| `js/lightbox.js` | Gallery lightbox: keyboard navigation (← → Esc), touch swipe, lazy loading. |
| `js/form.js` | Contact form: JS validation + honeypot + Web3Forms API submission. API key constant: `WEB3FORMS_ACCESS_KEY`. |

### CSS

- `css/variables.css` — all design tokens (colors, typography, spacing, shadows, gradients, breakpoints). Edit here first when changing the visual identity.
- `css/style.css` — all component styles, mobile-first. Breakpoints: `xs < 480px`, `sm ≥ 480px`, `md ≥ 768px`, `lg ≥ 1024px`, `xl ≥ 1280px`.

### Brand identity

| Token | Value | Role |
|-------|-------|------|
| `--bleu-nuit` | `#002B8A` | Primary — headings, strong backgrounds |
| `--orange-vif` | `#FF9800` | CTA buttons |
| `--gris-fonce` | `#2A2F3A` | Footer background |
| Titles | Exo 2 700/800 | Google Fonts |
| Body | Montserrat 400/600 | Google Fonts |

## Key content locations

- **Stats counters**: `index.html` `.chiffres` section → `data-count` / `data-suffix` attributes
- **Hero background photo**: add class `hero--with-img` to `<section class="hero">` in `index.html`
- **Gallery images**: `img/realisations/projet-01.jpg` … `projet-09.jpg`
- **Logos**: `img/logo/logo-nce.png` (light backgrounds) / `img/logo/logo-nce-white.png` (dark backgrounds)
- **Contact email / WhatsApp**: hardcoded in `js/components.js` footer and `js/form.js`
- **SEO canonical URL**: `https://www.nce-sarl.com` appears in each `<head>` and in `sitemap.xml` — replace all occurrences when the real domain is known

## Adding a new page

1. Copy an existing HTML file as a template.
2. Add the page to `NAV_LINKS` in `js/components.js` — this auto-updates the header nav and footer links on all pages.
3. Add the URL to `sitemap.xml`.
