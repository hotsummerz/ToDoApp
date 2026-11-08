# DESIGN.md — Todo Tugas Kuliah (Course Task Manager) Design System

> Single source of truth for the visual design, UI structure, and UI conventions of the "Todo Tugas Kuliah" web app.
> This app is a sibling of the owner's personal profile website (`https://hotsummerz.my.id/`) and MUST look like it belongs to the same family: same blue palette, same fonts, same card language, same hover/focus behavior.
> **Any AI agent or developer touching UI or CSS MUST read this file fully and follow it strictly. Do not improvise new visual styles.**

---

## 0. HOW TO USE THIS DOCUMENT (INSTRUCTIONS FOR AI AGENTS)

### 0.1 Absolute rules (never violate)

1. **Stack:** TypeScript + Vite, plain CSS in a single `src/style.css`. NO UI frameworks (React, Vue, Svelte, Angular), NO CSS frameworks (Tailwind, Bootstrap), NO component or icon libraries, NO CSS preprocessors, NO CSS-in-JS. Fonts come from Google Fonts via `<link>` in `index.html`. The only dev dependencies are `typescript` and `vite` unless the owner explicitly approves more.
2. **Tokens first.** Every color, font family, radius, and transition must come from the CSS custom properties in Section 3. Never hardcode a hex value inside a component rule if a token exists. If a new color is truly needed, add a token to `:root` first.
3. **Do not invent a new look.** Clean, minimalist, light theme, soft blue accent, white cards with 1px light borders, blue-tinted soft shadows, subtle hover states. New UI must look like it was always part of this app.
4. **Reuse existing components** (Section 6) before creating new ones. New components must be built from the same tokens, borders, radii, hover behavior, and spacing rhythm.
5. **Semantic, accessible HTML.** Use `header`, `main`, `section`, `form`, `label`, `ul/li`, `button`, `dialog`, `footer`. Native controls (`<input type="checkbox">`, `<select>`, `<input type="date">`) are styled, never replaced with `div` imitations.
6. **UI language is Indonesian** (`<html lang="id">`). All visible text, labels, placeholders, error messages, `aria-label`s, and toasts are Indonesian and follow the copy bank in Section 7. Code identifiers, CSS classes, and comments are English. This document is English, but the app's text is NOT translated.
7. **Never render user-entered text with `innerHTML`.** Use `textContent` / `createElement`. (Security rule that also affects UI code.)
8. **Light theme only.** No dark mode unless the owner asks.
9. **Keep CSS compact.** No dead code, no duplicated rules, no `!important`, no inline `style=""` attributes (the only exception is setting a CSS custom property from TypeScript when strictly needed).
10. **Accessibility is mandatory:** visible focus, labels on every control, keyboard operability, `aria-live` for dynamic feedback, `prefers-reduced-motion` support.

### 0.2 Before writing any UI code, an agent must

1. Find the matching component in Section 6 and reuse its markup and classes exactly.
2. Choose tokens from Section 3 for every visual property.
3. Take all user-facing strings from Section 7 (add new ones in the same tone).
4. Run the checklist in Section 12.

---

## 1. PROJECT SNAPSHOT

| Item | Value |
|---|---|
| Type | Single-page web app: course task (to-do) manager |
| Stack | TypeScript (strict) + Vite, vanilla DOM, no framework |
| Persistence | `localStorage` only (no backend) |
| Hosting | Static build deployed online on the owner's personal website (GitHub Pages) |
| Fonts | Geist (sans) and Geist Mono (mono) via Google Fonts |
| Theme | Light only, soft blue accent |
| Layout | Centered single column, max width 720px |
| Language | Indonesian UI (`lang="id"`) |
| Breakpoint | One: `max-width: 768px` |

### 1.1 Font loading (keep exactly, in `index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Allowed weights: Geist 300–700, Geist Mono 400–600. Do not load other families.

### 1.2 Required `<head>` metadata

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Todo Tugas Kuliah</title>
<meta name="description" content="Aplikasi web sederhana untuk mengelola daftar tugas kuliah.">
<meta property="og:title" content="Todo Tugas Kuliah">
<meta property="og:description" content="Aplikasi web sederhana untuk mengelola daftar tugas kuliah.">
```

---

## 2. DESIGN PRINCIPLES

1. **Calm and clean.** Lots of white space, one hue family (blue), 1px borders, very soft blue-tinted shadows.
2. **Card-based.** Every grouped piece of content (stats, form, each task) is a white card on the pale blue-white page.
3. **Quiet interactivity.** Hover: border turns blue, faint blue glow, light blue tint. Movement is tiny (scale 0.98, 2px nudges). No bouncing, no big animations.
4. **Mono for meta, sans for content.** Geist Mono for tags, badges, counts, and numbers. Geist for everything else.
5. **Status through restrained color.** Semantic colors (success/warning/danger) appear only on small elements (badges, deadline text, validation, destructive button), never as large fills.
6. **Fast and obvious.** One primary action per area. Destructive actions always require confirmation.
7. **Accessible by default.**
8. **Compact code.**

---

## 3. DESIGN TOKENS

### 3.1 Canonical `:root` (the first block is shared with the profile site and MUST NOT be renamed or changed)

```css
:root {
  /* ---- Brand blues (shared with profile site) ---- */
  --blue: #7BA6DE;
  --blue-light: #F0F6FD;
  --blue-subtle: #E2EDF9;
  --blue-border: #BED8F6;
  --blue-medium: #5187CE;
  --blue-deep: #1A3E6D;
  --blue-glow: rgba(123, 166, 222, 0.28);

  --bg: #F8FAFD;
  --bg-surface: #FFF;
  --bg-subtle: #F1F6FC;
  --border: #E2E8F0;

  --text: #0F172A;
  --text-secondary: #475569;
  --text-inverse: #FFF;

  --sans: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
  --mono: 'Geist Mono', 'SF Mono', monospace;

  --radius: 8px;
  --transition: 150ms cubic-bezier(0.16, 1, 0.3, 1);

  /* ---- Added for the todo app ---- */
  --blue-deep-hover: #244C7E;

  --success: #067647;
  --success-light: #ECFDF3;
  --success-border: #ABEFC6;

  --warning: #B54708;
  --warning-light: #FFFAEB;
  --warning-border: #FEDF89;

  --danger: #B42318;
  --danger-light: #FEF3F2;
  --danger-border: #FECDCA;
  --danger-hover: #912018;

  --overlay: rgba(15, 23, 42, 0.4);
}
```

### 3.2 Color roles

| Token | Role / usage |
|---|---|
| `--blue` | Brand accent. Card hover border, 3px accents. **Decorative only**, never text (low contrast on white). |
| `--blue-light` | Lightest tint: hover backgrounds (nav link, icon button, link), course badge background, table-like row hover. |
| `--blue-subtle` | Stronger tint for emphasized surfaces (rarely used). |
| `--blue-border` | Borders of blue-tinted elements: course badge, input hover, empty-state dashed border, checkbox border. |
| `--blue-medium` | Accent text/icons and focus ring. Use only for large/bold text, icons, borders, focus. Do not use for small body text. |
| `--blue-deep` | Strongest brand color: primary button, selected filter text, stat numbers, badge text, link text. Safe for small text. |
| `--bg` | Page background. |
| `--bg-surface` | Cards, inputs, dialog, header (with alpha), footer. |
| `--bg-subtle` | Filter-tab track, completed task card background. |
| `--border` | Default 1px border everywhere. |
| `--text` | Primary text, headings, input text. |
| `--text-secondary` | Labels, meta text, notes, completed titles, placeholders, footer. |
| `--text-inverse` | Text on `--blue-deep` / `--danger` fills. |
| `--success*` | "Done" feedback only (toast icon/text if needed, success badge). |
| `--warning*` | Medium priority badge; deadline "today / soon" text. |
| `--danger*` | High priority badge; overdue deadline text; validation errors; destructive button. |
| `--overlay` | Dialog backdrop only. |

Contrast rule: small text must be `--text`, `--text-secondary`, `--blue-deep`, `--success`, `--warning`, `--danger` (each on white or its own `*-light` background), or `--text-inverse` on `--blue-deep`/`--danger`. If a semantic color is changed, re-verify contrast.

### 3.3 Page background (atmosphere, keep exactly)

```css
html { background: var(--bg); }
body {
  background:
    radial-gradient(circle at 10% 20%, rgba(123, 166, 222, 0.06), transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(123, 166, 222, 0.05), transparent 45%) fixed;
}
```

No other gradients, patterns, or images.

### 3.4 Typography

Base: `html { font: 16px/1.6 var(--sans); -webkit-font-smoothing: antialiased; }`, text color `--text`.

| Role | Size | Weight | Line-height | Letter-spacing | Font | Notes |
|---|---|---|---|---|---|---|
| H1 (page title) | 2.25rem (36px); 1.875rem on mobile | 600 | 1.15 | -0.03em | sans | One per page, mb 8px |
| H2 (section title) | 1.5rem (24px); 1.375rem on mobile | 600 | 1.2 | -0.025em | sans | In `.section-header` |
| H3 (card/dialog/empty-state title) | 1.125rem (18px) | 600 | 1.3 | -0.015em | sans | mb 8px |
| Page subtitle | 1.0625rem (17px) | 400 | 1.6 | none | sans | `--text-secondary`, max-width 520px |
| Body / input text | 0.9375rem (15px) | 400 | 1.6 | none | sans | |
| Task title | 0.9375rem | 600 | 1.4 | none | sans | |
| Task notes | 0.875rem | 400 | 1.6 | none | sans | `--text-secondary` |
| Label | 0.875rem | 500 | 1.4 | none | sans | `--text` |
| Hint / error / deadline text | 0.8125rem (13px) | 400 (error 500) | 1.4 | none | sans | |
| Button | 0.875rem | 500 | 1.2 | none | sans | |
| Filter tab | 0.875rem | 500 | 1.2 | none | sans | |
| Badge | 0.75rem | 600 | 1 | 0.03em | mono | UPPERCASE |
| Stat label | 0.75rem | 600 | 1.2 | 0.08em | mono | UPPERCASE, `--text-secondary` |
| Stat value | 2rem (1.75rem on mobile) | 600 | 1.1 | -0.03em | sans | `--blue-deep` |
| Tab count | 0.75rem | 500 | 1 | none | mono | |
| Footer | 0.75rem | 400 | 1.5 | none | sans | `--text-secondary` |

Rules: headings weight 600 only with negative letter-spacing; mono only for tags, badges, counts, numbers; UPPERCASE only for mono tags/badges; no italics, no weights above 600. Form controls do not inherit fonts by default, so the global rule `button, input, select, textarea { font: inherit; color: inherit; }` is required (Section 4).

### 3.5 Spacing scale (4px rhythm; use only these px values)

`2, 4, 6, 8, 12, 14, 16, 20, 24, 28, 32, 40, 48, 64, 80`

| Context | Value |
|---|---|
| Container horizontal padding | 24px |
| Header vertical padding | 18px |
| `main` padding | 40px top, 80px bottom |
| Gap between page blocks (`.section-block`) | margin-bottom 40px |
| Section header | mb 24px, pb 12px, `border-bottom: 1px solid var(--border)` |
| Card padding (form card, empty state) | 28px (24px on mobile) |
| Task card padding | 16px 20px |
| Stat card padding | 20px (16px on mobile) |
| Grid gaps (stats, form fields) | 16px |
| Task list gap | 12px |
| Label to control | 6px |
| Dialog padding | 28px |

### 3.6 Radius

| Value | Use |
|---|---|
| `var(--radius)` 8px | Cards, task cards, stat cards, empty state |
| 12px | Dialog |
| 4px | Buttons, inputs, selects, textareas, filter tabs and track, icon buttons, checkbox, toast, nav link |
| 9999px | Badges |

### 3.7 Borders

Default `1px solid var(--border)`. Blue-tinted elements use `--blue-border`. Hover on cards: `border-color: var(--blue)`. Invalid fields: `--danger`. Empty state: `1px dashed var(--blue-border)`.

### 3.8 Shadows (always soft and blue-tinted)

| Use | Value |
|---|---|
| Resting cards | none (flat) |
| Card hover | `0 4px 14px var(--blue-glow)` |
| Selected filter tab | `0 1px 3px var(--blue-glow)` |
| Dialog | `0 12px 32px rgba(123, 166, 222, 0.25)` |
| Toast | `0 4px 12px var(--blue-glow)` |

Never use black/gray shadows. Never exceed ~32px blur.

### 3.9 Motion

| Use | Value |
|---|---|
| Default transitions (color, background, border-color, box-shadow, transform) | `var(--transition)` = `150ms cubic-bezier(0.16, 1, 0.3, 1)` |
| Page-block reveal | `600ms cubic-bezier(0.16,1,0.3,1)` on opacity and transform; start `opacity:0; translateY(12px)` |
| New task entrance | `300ms cubic-bezier(0.16,1,0.3,1)` fade + `translateY(8px)`, class `is-new`, applied only to the single newly added item |
| Primary button hover | `transform: scale(0.98)` |
| Toast | fade in/out `150ms` |

Rules: animate only `opacity`, `transform`, `color`, `background`, `border-color`, `box-shadow`. Single easing curve. Never exceed 600ms. Never animate the whole task list on re-render. Always honor `prefers-reduced-motion` (Section 10).

### 3.10 Z-index

Header 100 · Toast region 200 · Dialog uses the browser top layer (no z-index).

### 3.11 Layout

- `.container { width: 100%; max-width: 720px; margin: 0 auto; padding: 0 24px; }`
- Body is a flex column, `min-height: 100vh`; `main { flex: 1 }` so the footer stays at the bottom.
- Single breakpoint `@media (max-width: 768px)`. Prefer fluid layouts (`1fr`, `auto`, flex-wrap).

---

## 4. GLOBAL / BASE STYLES (keep as is)

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font: 16px/1.6 var(--sans);
  color: var(--text);
  background: var(--bg);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: /* two radial glows, see 3.3 */;
}

button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; }
button:disabled, input:disabled, select:disabled, textarea:disabled { opacity: 0.6; cursor: not-allowed; }

a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible,
textarea:focus-visible, [tabindex="0"]:focus-visible {
  outline: 2px solid var(--blue-medium);
  outline-offset: 3px;
}

dialog { margin: auto; }   /* required: the global reset removes the browser's default centering */

h1, h2, h3 { color: var(--text); font-weight: 600; }
main { flex: 1; padding: 40px 0 80px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
```

Because of the global reset, spacing and list styles must always be set explicitly.

---

## 5. PAGE ARCHITECTURE

Static skeleton in `index.html` (dynamic parts are rendered by TypeScript into the marked containers):

```html
<body>
  <a class="skip-link" href="#main-content">Lewati ke konten utama</a>

  <header class="site-header">
    <div class="container header-inner">
      <span class="brand">Todo Tugas Kuliah</span>
      <a class="nav-link" href="https://hotsummerz.my.id/">← Kembali ke Profil</a>
    </div>
  </header>

  <main id="main-content">
    <div class="container">
      <section class="section-block animate-fade-in page-intro">
        <h1>Daftar Tugas Kuliah</h1>
        <p class="page-subtitle">Catat, pantau, dan selesaikan tugas kuliahmu dalam satu tempat.</p>
      </section>

      <section class="section-block animate-fade-in" aria-labelledby="stats-title">
        <h2 id="stats-title" class="sr-only">Ringkasan</h2>
        <div class="stats-grid" id="stats"></div>            <!-- rendered by TS -->
      </section>

      <section class="section-block animate-fade-in" aria-labelledby="form-title">
        <header class="section-header"><h2 id="form-title">Tambah Tugas</h2></header>
        <form class="bento-card task-form" id="task-form" novalidate>…</form>
      </section>

      <section class="section-block animate-fade-in" aria-labelledby="list-title">
        <header class="section-header"><h2 id="list-title">Daftar Tugas</h2></header>
        <div class="toolbar">…filter tabs + sort select…</div>
        <ul class="task-list" id="task-list"></ul>           <!-- rendered by TS -->
        <div id="empty-state"></div>                          <!-- rendered by TS -->
      </section>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container footer-content">
      <address><strong>Todo Tugas Kuliah</strong><br>Tugas Mata Kuliah [ISI NAMA MATA KULIAH]</address>
    </div>
  </footer>

  <div class="toast-region" id="toast-region" role="status" aria-live="polite"></div>
  <dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-title">…</dialog>
  <script type="module" src="/src/main.ts"></script>
</body>
```

Vertical order: intro → stats → form → list → footer. Do not reorder.

---

## 6. COMPONENT LIBRARY

### 6.1 Skip link and `.sr-only`
`.skip-link`: `position:absolute; top:-100px; left:24px; background:var(--blue-deep); color:var(--text-inverse); padding:12px 20px; border-radius:4px; font:500 0.875rem var(--mono); text-decoration:none; z-index:9999; box-shadow:0 4px 12px var(--blue-glow); transition: top var(--transition);` · `:focus { top:20px; outline:3px solid var(--blue); outline-offset:2px; }`.

### 6.2 Site header
- `.site-header { position:sticky; top:0; z-index:100; background:rgba(255,255,255,0.9); backdrop-filter:blur(10px); border-bottom:1px solid var(--border); padding:18px 0; }`
- `.header-inner { display:flex; align-items:center; justify-content:space-between; gap:16px; }`
- `.brand { font: 600 0.9375rem/1.2 var(--sans); letter-spacing:-0.015em; color:var(--text); }`
- `.nav-link { color:var(--text-secondary); text-decoration:none; font:500 0.875rem var(--sans); padding:6px 8px; border-radius:4px; transition: color, background var(--transition); }` · hover: `color:var(--blue-deep); background:var(--blue-light);`
- The back link to the profile site is required.

### 6.3 Section block and section header
- `.section-block { margin-bottom:40px; }`
- `.section-header { margin-bottom:24px; border-bottom:1px solid var(--border); padding-bottom:12px; }` containing exactly one `h2`.
- `.page-intro` has no section header. `.page-subtitle { font-size:1.0625rem; color:var(--text-secondary); max-width:520px; }`

### 6.4 Card (`.bento-card`)
```css
.bento-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.bento-card:hover { border-color: var(--blue); box-shadow: 0 4px 14px var(--blue-glow); }
```
Every card gets this hover (the site's signature interaction), including non-clickable ones.

### 6.5 Stat cards
```html
<div class="stats-grid">
  <article class="bento-card stat-card">
    <span class="stat-label">Total</span>
    <span class="stat-value">12</span>
  </article>
  …(Aktif, Selesai)
</div>
```
- `.stats-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }`
- `.stat-card { padding:20px; }` (16px mobile) · `.stat-label` and `.stat-value` are `display:block`; value mt 4px.
- Exactly three: Total, Aktif, Selesai. Numbers update live.

### 6.6 Form controls
Markup:
```html
<div class="field">
  <label for="task-title">Judul Tugas</label>
  <input id="task-title" name="title" type="text" maxlength="120" required
         placeholder="Contoh: Laporan praktikum basis data" aria-describedby="task-title-error">
  <p class="field-error" id="task-title-error" hidden></p>
</div>
```
Spec:
- `.field label { display:block; font:500 0.875rem/1.4 var(--sans); margin-bottom:6px; }` (optional marker: label text includes "(opsional)", never an asterisk)
- `input, select, textarea { width:100%; background:var(--bg-surface); border:1px solid var(--border); border-radius:4px; padding:10px 12px; min-height:40px; font-size:0.9375rem; transition: border-color, box-shadow var(--transition); }`
- hover: `border-color:var(--blue-border);` focus-visible: global ring + `border-color:var(--blue-medium);`
- `::placeholder { color:var(--text-secondary); opacity:0.7; }`
- `textarea { min-height:88px; resize:vertical; line-height:1.6; }`
- `input[type="date"], select { color-scheme: light; }`; `select` uses `appearance:none` with a chevron `background-image` (inline SVG data URI, stroke `%23475569`, 16px, positioned right 12px center) and `padding-right:36px`.
- Invalid: `[aria-invalid="true"] { border-color:var(--danger); }` plus `.field-error { font:500 0.8125rem/1.4 var(--sans); color:var(--danger); margin-top:6px; }` (not `hidden` when shown; linked with `aria-describedby`).
- `.field-hint { font-size:0.8125rem; color:var(--text-secondary); margin-top:6px; }`

### 6.7 Task form (`.task-form`)
- `.form-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; }` · `.field-full { grid-column:1 / -1; }`
- Field order: **Judul Tugas** (full) · **Mata Kuliah** | **Tenggat** · **Prioritas** (full or half) · **Catatan (opsional)** (full).
- `.form-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:20px; }` → primary submit button, secondary "Batal" (visible only in edit mode).
- Mobile: `.form-grid { grid-template-columns:1fr; }`.
- Add mode: heading "Tambah Tugas", submit "Tambah Tugas". Edit mode: heading "Ubah Tugas", submit "Simpan Perubahan", "Batal" visible, focus moves to the title input.

### 6.8 Buttons
Base shared rules: `display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:40px; border-radius:4px; font:500 0.875rem/1.2 var(--sans); text-decoration:none; transition: background, border-color, transform var(--transition);`
- `.btn-primary`: `background:var(--blue-deep); color:var(--text-inverse); padding:11px 20px; border:1px solid var(--blue-deep);` hover: `background:var(--blue-deep-hover); transform:scale(0.98);`
- `.btn-secondary`: `background:var(--bg-surface); color:var(--blue-deep); padding:10px 18px; border:1px solid var(--border);` hover: `background:var(--blue-light); border-color:var(--blue-border);`
- `.btn-danger`: `background:var(--danger); color:var(--text-inverse); padding:11px 20px; border:1px solid var(--danger);` hover: `background:var(--danger-hover); transform:scale(0.98);` — used ONLY inside the delete confirmation dialog.
- `.btn-icon` (edit/delete on a task): `width:36px; height:36px; padding:0; background:transparent; color:var(--text-secondary); border:1px solid transparent; border-radius:4px;` hover: `background:var(--blue-light); color:var(--blue-deep); border-color:var(--blue-border);` · `.btn-icon.is-danger:hover { background:var(--danger-light); color:var(--danger); border-color:var(--danger-border); }` · icons 18px.
- At most one primary button per area. Icon buttons always have an `aria-label` (Section 7).

### 6.9 Toolbar: filter tabs + sort
```html
<div class="toolbar">
  <div class="filter-tabs" role="group" aria-label="Filter tugas">
    <button type="button" class="filter-tab" aria-pressed="true">Semua <span class="tab-count">12</span></button>
    <button type="button" class="filter-tab" aria-pressed="false">Aktif <span class="tab-count">8</span></button>
    <button type="button" class="filter-tab" aria-pressed="false">Selesai <span class="tab-count">4</span></button>
  </div>
  <div class="sort-control">
    <label for="sort-select" class="sr-only">Urutkan</label>
    <select id="sort-select">…</select>
  </div>
</div>
```
- `.toolbar { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; }`
- `.filter-tabs { display:inline-flex; gap:2px; padding:3px; background:var(--bg-subtle); border:1px solid var(--border); border-radius:4px; }`
- `.filter-tab { display:inline-flex; align-items:center; gap:8px; padding:6px 14px; border:1px solid transparent; border-radius:4px; background:transparent; color:var(--text-secondary); font:500 0.875rem/1.2 var(--sans); transition: color, background, box-shadow var(--transition); }` hover: `color:var(--blue-deep);`
- `.filter-tab[aria-pressed="true"] { background:var(--bg-surface); color:var(--blue-deep); border-color:var(--border); box-shadow:0 1px 3px var(--blue-glow); }`
- `.tab-count { font:500 0.75rem var(--mono); }`
- `.sort-control select { min-width:200px; }`
- Mobile: `.toolbar { flex-direction:column; align-items:stretch; }` · `.filter-tabs { display:flex; }` · `.filter-tab { flex:1; justify-content:center; }` · `.sort-control select { width:100%; min-width:0; }`

### 6.10 Task list and task card
```html
<ul class="task-list" id="task-list">
  <li class="bento-card task-card" data-id="…">          <!-- add .is-done when completed -->
    <input type="checkbox" class="task-check" aria-label="Tandai selesai: Judul tugas">
    <div class="task-body">
      <p class="task-title">Judul tugas</p>
      <div class="task-meta">
        <span class="badge badge-blue">Manajemen Basis Data</span>
        <span class="badge badge-danger">Tinggi</span>
        <span class="task-deadline is-overdue"><svg class="icon">…</svg> 12 Mei 2026 · Terlambat 2 hari</span>
      </div>
      <p class="task-notes">Catatan opsional…</p>
    </div>
    <div class="task-actions">
      <button type="button" class="btn-icon" data-action="edit" aria-label="Ubah tugas: Judul tugas">…</button>
      <button type="button" class="btn-icon is-danger" data-action="delete" aria-label="Hapus tugas: Judul tugas">…</button>
    </div>
  </li>
</ul>
```
- `.task-list { list-style:none; display:grid; gap:12px; }`
- `.task-card { padding:16px 20px; display:grid; grid-template-columns:auto 1fr auto; gap:16px; align-items:start; }` (extends `.bento-card`, overrides padding)
- `.task-title { font:600 0.9375rem/1.4 var(--sans); overflow-wrap:anywhere; }`
- `.task-meta { display:flex; flex-wrap:wrap; align-items:center; gap:8px 12px; margin-top:8px; }`
- `.task-deadline { display:inline-flex; align-items:center; gap:6px; font-size:0.8125rem; color:var(--text-secondary); }` · `.is-soon { color:var(--warning); }` · `.is-overdue { color:var(--danger); font-weight:500; }` · clock icon 14px.
- `.task-notes { font-size:0.875rem; line-height:1.6; color:var(--text-secondary); margin-top:8px; white-space:pre-wrap; overflow-wrap:anywhere; }`
- `.task-actions { display:flex; gap:4px; }`
- **Completed state** `.task-card.is-done`: `background:var(--bg-subtle);` `.task-title { color:var(--text-secondary); text-decoration:line-through; text-decoration-color:var(--blue-border); }` `.badge, .task-deadline { opacity:0.7; }` and the deadline never shows overdue/soon colors.
- Entrance: `.task-card.is-new { animation: task-in 300ms cubic-bezier(0.16,1,0.3,1); }` (remove class on `animationend`).
- Interaction happens via event delegation on the `ul` using `data-action`.

### 6.11 Checkbox
```css
.task-check {
  appearance: none;
  width: 20px; height: 20px; margin-top: 2px;
  border: 2px solid var(--blue-border);
  border-radius: 4px;
  background: var(--bg-surface) center / 14px no-repeat;
  cursor: pointer;
  transition: background-color var(--transition), border-color var(--transition);
}
.task-check:hover { border-color: var(--blue); }
.task-check:checked {
  background-color: var(--blue-deep);
  border-color: var(--blue-deep);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E");
}
```
Always a native `<input type="checkbox">` (keyboard and screen-reader support for free).

### 6.12 Badges
`.badge { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:9999px; font:600 0.75rem var(--mono); letter-spacing:0.03em; text-transform:uppercase; border:1px solid; }`

| Class | Background | Text | Border | Used for |
|---|---|---|---|---|
| `.badge-blue` | `--blue-light` | `--blue-deep` | `--blue-border` | Course name |
| `.badge-neutral` | `--bg-subtle` | `--text-secondary` | `--border` | Priority "Rendah" |
| `.badge-warning` | `--warning-light` | `--warning` | `--warning-border` | Priority "Sedang" |
| `.badge-danger` | `--danger-light` | `--danger` | `--danger-border` | Priority "Tinggi" |
| `.badge-success` | `--success-light` | `--success` | `--success-border` | Reserved (success states) |

Course badge text is truncated with `max-width: 100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;` (long names must not break the card).

### 6.13 Empty state
```html
<div class="empty-state">
  <h3>Belum ada tugas</h3>
  <p>Tambahkan tugas pertamamu lewat formulir di atas.</p>
</div>
```
`.empty-state { background:var(--bg-surface); border:1px dashed var(--blue-border); border-radius:var(--radius); padding:48px 24px; text-align:center; }` · `p { color:var(--text-secondary); font-size:0.9375rem; }`. No hover effect (it is not a `.bento-card`). Shown instead of the list when the visible list is empty (copy depends on the filter, Section 7).

### 6.14 Confirm dialog (native `<dialog>`)
```html
<dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-title">
  <form method="dialog">
    <h3 id="confirm-title">Hapus tugas ini?</h3>
    <p class="confirm-text">Tugas “…” akan dihapus permanen.</p>
    <div class="dialog-actions">
      <button class="btn-secondary" value="cancel">Batal</button>
      <button class="btn-danger" value="confirm">Ya, Hapus</button>
    </div>
  </form>
</dialog>
```
- `.confirm-dialog { width:calc(100% - 48px); max-width:400px; border:1px solid var(--border); border-radius:12px; padding:28px; background:var(--bg-surface); color:var(--text); box-shadow:0 12px 32px rgba(123,166,222,0.25); }`
- `.confirm-dialog::backdrop { background:var(--overlay); }`
- `.confirm-text { color:var(--text-secondary); font-size:0.9375rem; margin-bottom:24px; }` · `.dialog-actions { display:flex; justify-content:flex-end; gap:12px; }`
- Open with `showModal()`; Esc closes natively; focus returns to the triggering button. Initial focus on "Batal" (`autofocus`).
- The task title in the text is inserted with `textContent`.

### 6.15 Toast
`.toast-region { position:fixed; left:50%; bottom:24px; transform:translateX(-50%); z-index:200; display:grid; gap:8px; width:calc(100% - 48px); max-width:360px; pointer-events:none; }` · `.toast { background:var(--blue-deep); color:var(--text-inverse); padding:12px 20px; border-radius:4px; font:500 0.875rem/1.4 var(--sans); box-shadow:0 4px 12px var(--blue-glow); text-align:center; animation: fade 150ms ease; }` · auto-dismiss after 3000ms; max 1 visible toast at a time (replace). Container has `role="status" aria-live="polite"`.

### 6.16 Footer
`.site-footer { border-top:1px solid var(--border); background:var(--bg-surface); padding:24px 0; font-size:0.75rem; color:var(--text-secondary); }` · `.footer-content { text-align:center; }` · `address { font-style:normal; line-height:1.5; }`

### 6.17 Icons
Inline SVG only, Feather-style outline: `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`, `aria-hidden="true"`, sized via `.icon { width:18px; height:18px; }` (14px for the deadline clock). Keep them as constant strings in `src/ui/icons.ts` (static strings are the only content allowed in `innerHTML`). No icon fonts, no icon libraries, no emoji in UI.

| Icon | Inner SVG |
|---|---|
| edit | `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>` |
| trash | `<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>` |
| clock | `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>` |

### 6.18 Page-block reveal
CSS (same as the profile site):
```css
.animate-fade-in { opacity:0; transform:translateY(12px); transition: opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1); }
.animate-fade-in.is-visible { opacity:1; transform:translateY(0); }
```
TypeScript (`src/ui/reveal.ts`): `IntersectionObserver` with `{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }`, adds `is-visible` once then unobserves; if `prefers-reduced-motion` or no IO support, add `is-visible` to all immediately. Apply `.animate-fade-in` ONLY to the static top-level `section-block`s, never to dynamic list items.

---

## 7. COPY BANK (Indonesian UI text; keep tone: friendly, short, informal-polite "kamu")

| Key | Text |
|---|---|
| Page title / H1 | Daftar Tugas Kuliah |
| Subtitle | Catat, pantau, dan selesaikan tugas kuliahmu dalam satu tempat. |
| Back link | ← Kembali ke Profil |
| Stats | Total · Aktif · Selesai |
| Form heading (add / edit) | Tambah Tugas / Ubah Tugas |
| Labels | Judul Tugas · Mata Kuliah (opsional) · Tenggat (opsional) · Prioritas · Catatan (opsional) |
| Placeholders | Contoh: Laporan praktikum basis data · Contoh: Manajemen Basis Data · Tambahkan detail tugas… |
| Priority options | Rendah · Sedang (default) · Tinggi |
| Buttons | Tambah Tugas · Simpan Perubahan · Batal · Hapus · Ya, Hapus |
| Filters | Semua · Aktif · Selesai |
| Sort label (sr-only) | Urutkan |
| Sort options | Tenggat terdekat (default) · Terbaru ditambahkan · Prioritas tertinggi |
| List heading | Daftar Tugas |
| Empty (no tasks at all) | **Belum ada tugas** — Tambahkan tugas pertamamu lewat formulir di atas. |
| Empty (filter Aktif) | **Tidak ada tugas aktif** — Semua tugas sudah selesai. Kerja bagus! |
| Empty (filter Selesai) | **Belum ada tugas yang selesai** — Centang tugas yang sudah kamu kerjakan. |
| Validation: title empty | Judul tugas wajib diisi. |
| Validation: title too long | Judul tugas maksimal 120 karakter. |
| Dialog | **Hapus tugas ini?** — Tugas “{title}” akan dihapus permanen. |
| Toasts | Tugas ditambahkan. · Perubahan disimpan. · Tugas dihapus. · Tugas ditandai selesai. · Tugas dikembalikan ke aktif. |
| Storage error | Data tidak dapat disimpan di browser ini. |
| aria-labels | Tandai selesai: {title} · Ubah tugas: {title} · Hapus tugas: {title} · Filter tugas |
| Footer | Todo Tugas Kuliah · Tugas Mata Kuliah [ISI NAMA MATA KULIAH] |

**Deadline display** (`id-ID` locale, local timezone): formatted with `Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })` (e.g. "12 Mei 2026"), followed by a relative hint when relevant: ` · Terlambat {n} hari` (overdue), ` · Hari ini`, ` · Besok`, ` · {n} hari lagi` (2–3 days). Beyond 3 days: date only. No deadline: show nothing (omit the element).

**Deadline color mapping (active tasks only):** overdue → `.is-overdue` (danger); today / tomorrow / ≤3 days → `.is-soon` (warning); otherwise default secondary color. Completed tasks never use urgency colors.

**Priority badge mapping:** `low` → `.badge-neutral` "Rendah" · `medium` → `.badge-warning` "Sedang" · `high` → `.badge-danger` "Tinggi".

---

## 8. STATE MATRIX

| State | Visual behavior |
|---|---|
| Active task | White card, normal title, urgency color on deadline |
| Completed task | `.is-done`: subtle background, struck-through secondary title, dimmed badges |
| Editing task | Form heading "Ubah Tugas", submit "Simpan Perubahan", "Batal" visible, form scrolled into view, title focused. Optionally highlight the edited card with `border-color: var(--blue)`. |
| Invalid field | Red border + error text below + `aria-invalid="true"`; focus moves to first invalid field on submit |
| Empty list | Dashed empty state (copy depends on filter) |
| Delete pending | Modal dialog; background inert |
| Storage failure | Toast with storage-error copy; app keeps working in memory |

---

## 9. RESPONSIVE BEHAVIOR

```css
@media (max-width: 768px) {
  h1 { font-size: 1.875rem; }
  h2 { font-size: 1.375rem; }
  .bento-card { padding: 24px; }
  .task-card { padding: 16px; }
  .stat-card { padding: 16px; }
  .stat-value { font-size: 1.75rem; }
  .form-grid { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .filter-tabs { display: flex; }
  .filter-tab { flex: 1; justify-content: center; }
  .sort-control select { width: 100%; min-width: 0; }
}
```
Must work down to 320px width with no horizontal page scroll. Touch targets ≥ 36px (icon buttons) and ≥ 40px (inputs, buttons).

---

## 10. ACCESSIBILITY REQUIREMENTS

- `<html lang="id">`; one `h1`; heading order `h1 → h2 → h3`.
- Every input has a visible `<label for>`; errors linked via `aria-describedby`; invalid fields get `aria-invalid="true"`.
- Filter buttons use `aria-pressed`; list is a real `<ul>`; checkbox is native.
- Dynamic feedback (toast) uses `role="status"` / `aria-live="polite"`.
- Dialog: native `<dialog>` + `showModal()`; Esc closes; focus returns to the trigger.
- Focus rings are never removed; hover-only information is forbidden.
- Do not rely on color alone: priority is text in the badge, overdue is text ("Terlambat…"), completed is struck through plus a checked checkbox.
- Reduced motion (required):
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animate-fade-in { opacity: 1; transform: none; transition: none; }
  .task-card.is-new, .toast { animation: none; }
}
```

---

## 11. CSS ORGANIZATION AND NAMING

- Single file `src/style.css`, imported from `main.ts`. Order: tokens → reset/base → a11y helpers → container/header → main/sections → typography → cards → stats → form controls → buttons → toolbar/tabs → task list/card/checkbox → badges → empty state → dialog → toast → footer → animation → media queries (`max-width: 768px`, then `prefers-reduced-motion`).
- Class names: lowercase kebab-case English, component-prefix style (`.task-card`, `.task-title`, `.filter-tab`). State classes use `is-*`. Utilities: `.sr-only`, `.animate-fade-in`.
- No ids for styling. No inline styles. No `!important`. Indentation 2 spaces. One declaration per line for multi-declaration rules; one-liners allowed for 1–2 declarations.

---

## 12. PRE-COMMIT CHECKLIST FOR ANY UI CHANGE

- [ ] Only tokens from Section 3 used (no stray hex values).
- [ ] Existing component reused or built from the same primitives.
- [ ] All visible text is Indonesian and consistent with Section 7.
- [ ] User-entered text rendered with `textContent` only.
- [ ] Hover AND `:focus-visible` defined for every interactive element.
- [ ] Shadows are soft and blue-tinted; semantic colors only on small elements.
- [ ] Works at 320px, 768px, and desktop; no horizontal page scroll.
- [ ] Keyboard-only flow works (add, edit, toggle, delete, filter, sort, dialog).
- [ ] `prefers-reduced-motion` respected.
- [ ] No new dependencies, no frameworks, no inline styles, no `!important`.
- [ ] `npm run build` passes with zero TypeScript errors.

---

## 13. QUICK-REFERENCE PROMPT (paste at the start of any AI session)

> You are building a course to-do web app with TypeScript + Vite (vanilla DOM, no UI/CSS frameworks, localStorage persistence). Follow `DESIGN.md` strictly. Light theme with the soft-blue palette from the CSS variables in `:root`; fonts Geist (content) and Geist Mono (badges, counts, tags). Centered 720px column; white cards with 1px `--border`, 8px radius, blue border + glow on hover; controls and buttons have 4px radius; primary buttons are `--blue-deep`; semantic colors (success/warning/danger) only on small elements; destructive actions need a native `<dialog>` confirmation. UI text is Indonesian from the copy bank. Never use `innerHTML` with user data. Keep the code compact and accessible (labels, focus-visible, aria-live, reduced motion). Do not add new visual styles or dependencies.