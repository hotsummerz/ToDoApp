# Todo Tugas Kuliah

A simple web app for managing university course tasks, built with **TypeScript + Vite**, versioned with **Git/GitHub**, and deployed online on the owner's personal website. This is a **graded university assignment**. The owner is graded not only on the app but on the *process* (Git history, npm/Vite usage, TypeScript concepts, env variables, documentation). Work accordingly: clarity and demonstrable concepts matter more than extra features.

## 1. Grading rubric (prioritize in this order)

| Component | Points | Where it is satisfied |
|---|---|---|
| App runs and is online on the personal website | 30 | Section 10 (deployment), Definition of Done |
| Git and GitHub usage | 25 | Section 7 (Git workflow) |
| TypeScript application | 20 | Section 5 (TS concepts map) |
| npm and Vite usage | 15 | Section 6 |
| Environment variables and documentation | 10 | Sections 8 and 11 |

Get a working deployed app early (30 points), then layer the rest.

## 2. Assignment requirements (from the official brief)

**2.1 Web app, minimum features**
- [ ] Show a list of course tasks
- [ ] Add a new task
- [ ] Edit and delete a task
- [ ] Show task status: **"Belum Selesai"** / **"Selesai"** (this exact text, visible on every task)
- [ ] Neat and responsive UI

**2.2 Git and GitHub**
- [ ] GitHub repository
- [ ] At least **5 commits**
- [ ] At least **2 branches** (besides `main`)
- [ ] Merge branches into the main branch
- [ ] Try to resolve a **merge conflict**
- [ ] Do **push and pull**
- [ ] At least **1 Pull Request**
- [ ] Use a `.gitignore` file

**2.3 npm and Vite**
- [ ] Project created with Vite
- [ ] npm manages packages
- [ ] `package.json` and npm scripts used
- [ ] Understand dependencies, devDependencies, semantic versioning
- [ ] App runs (`dev`) and builds (`build`)

**2.4 TypeScript** (the code MUST contain examples of): primitive types (`string`, `number`, `boolean`), arrays, interfaces, type aliases and union types, simple generics.

**2.5 Environment variables**
- [ ] `.env` file used for app configuration
- [ ] `.env.example` created and committed
- [ ] Passwords and API keys never shown on the website nor pushed to GitHub
- [ ] Use only non-secret example config (app name, app version)

**2.6 Deliverables the owner must submit**
1. Link to the personal website that displays the task app
2. Link to the GitHub repository (source code and commit history)
3. Screenshots proving: branches, merge, Pull Request, conflict resolution
4. A short explanation **on the personal website** about Git, npm, TypeScript, Vite, and env variables, including the roles of **compiler / transpiler / bundler** (see Section 11)

If this file ever conflicts with the official brief, the brief wins. Ask the owner.

## 3. Tech stack

- TypeScript (strict) + Vite (`vanilla-ts` template), plain DOM APIs
- **No UI framework** (React/Vue/Svelte), **no Tailwind/Bootstrap**, no component libraries
- Plain CSS in `src/style.css`
- `localStorage` for persistence (no backend, no database)
- Runtime `dependencies`: none. `devDependencies`: `typescript`, `vite` only. **Ask before adding any dependency.** (The README must still explain what `dependencies` vs `devDependencies` mean, and why this project's `dependencies` is empty.)

## 4. Project structure

```
/
├── index.html
├── vite.config.ts              # sets `base` for deployment
├── tsconfig.json
├── package.json                # name, version, "private": true, scripts
├── package-lock.json           # committed
├── .gitignore                  # committed (Section 7.1)
├── .env                        # NOT committed (local config)
├── .env.example                # committed (template, no secrets)
├── .github/workflows/deploy.yml  # build + deploy to GitHub Pages
├── CLAUDE.md
├── DESIGN.md                   # visual design system — read before UI/CSS work
├── README.md
├── docs/screenshots/           # evidence screenshots (owner adds)
└── src/
    ├── main.ts                 # entry: wires config, store, renderers, events
    ├── vite-env.d.ts           # types for import.meta.env (ImportMetaEnv)
    ├── config.ts               # reads env vars into a typed AppConfig
    ├── style.css
    ├── types.ts                # Task, Priority, Filter, SortKey, Result<T>, ...
    ├── storage.ts              # the ONLY module that touches localStorage
    ├── store.ts                # app state + actions + subscribe
    ├── utils/
    │   ├── date.ts             # local-date parse/format/relative-day helpers
    │   └── sort.ts             # filter + sort (pure, generic helpers)
    └── ui/
        ├── render.ts           # stats, list, empty state
        ├── form.ts             # form, validation, add/edit mode
        ├── dialog.ts           # delete confirmation
        ├── toast.ts
        ├── icons.ts            # static SVG strings
        └── reveal.ts           # page-block scroll reveal
```

Do not create new top-level folders without asking.

## 5. TypeScript requirements (20 points): MUST be visibly demonstrated

Strict mode on, no `any`. Every concept below must appear in real, used code (not dead demo code), and each occurrence gets a short marker comment `// TS concept: <name>` so a grader can find it. The README lists concept → file.

| Concept | Required example in this project |
|---|---|
| Primitives | `Task.title: string`, `Task.createdAt: number`, `Task.completed: boolean` |
| Arrays | `Task[]` in the store; `readonly Task[]` parameters in pure functions |
| Interface | `interface Task`, `interface StoredData`, `interface AppConfig` |
| Type alias | `type Priority`, `type Filter`, `type SortKey`, `type TaskStatusLabel` |
| Union types | `type Priority = 'low' \| 'medium' \| 'high'`; `deadline: string \| null`; `type TaskStatusLabel = 'Belum Selesai' \| 'Selesai'` |
| Generics | `type Result<T>` (discriminated union), `function sortBy<T>(items: readonly T[], compare: (a: T, b: T) => number): T[]`, and/or `function readJson<T>(key: string, isValid: (v: unknown) => v is T): Result<T>` |

### Data model

```ts
// TS concept: type alias + union types
export type Priority = 'low' | 'medium' | 'high';
export type Filter = 'all' | 'pending' | 'done';
export type SortKey = 'deadline' | 'newest' | 'priority';
export type TaskStatusLabel = 'Belum Selesai' | 'Selesai';

// TS concept: interface + primitive types + union with null
export interface Task {
  id: string;                 // crypto.randomUUID()
  title: string;              // required, trimmed, 1–120 chars
  course: string;             // optional, trimmed, max 80 chars; '' when empty
  deadline: string | null;    // local date 'YYYY-MM-DD' or null
  priority: Priority;         // default 'medium'
  notes: string;              // optional, trimmed, max 500 chars; '' when empty
  completed: boolean;
  createdAt: number;          // Date.now()
  completedAt: number | null; // set when completed, null otherwise
}

// TS concept: generics
export type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

Storage format: key `todo-tugas-kuliah:v1`, value `JSON.stringify({ version: 1, tasks: Task[] })` (typed by `interface StoredData`).

## 6. npm and Vite requirements (15 points)

Scripts in `package.json` (keep names exactly):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  }
}
```

- `npm install` (use `npm ci` in CI). **Commit `package-lock.json`.**
- Vite transpiles TypeScript but does **not** type-check; that is why `build` runs `tsc` first. Never remove `tsc` from `build`.
- Set meaningful `name`, `version`, `"private": true` in `package.json`.
- Semantic versioning, to be explained in the README: `MAJOR.MINOR.PATCH`; `^1.2.3` allows minor and patch updates; `~1.2.3` allows patch updates only; an exact version pins it. Show the real ranges from this project's `package.json` as examples.
- `dependencies` = needed at runtime; `devDependencies` = only needed to develop/build (TypeScript, Vite). Explain in the README why this app has zero runtime dependencies.
- Always run `npm run build` before declaring any task done: zero TypeScript errors.

## 7. Git and GitHub requirements (25 points)

**The Git history is graded work. Treat it as the product.**

### 7.1 `.gitignore` (must exist from the first commit)

```
node_modules/
dist/
.env
.env.local
.env.*.local
*.log
.DS_Store
.vscode/*
!.vscode/extensions.json
.idea/
```
`.env.example` must NOT be ignored. Before every push, verify no secrets or `.env` are tracked: `git ls-files | grep -E "^\.env"` must show only `.env.example`.

### 7.2 Required Git activities and a recommended path

| Requirement | How to satisfy it in this repo |
|---|---|
| ≥ 5 commits | Many small, real, meaningful commits (aim for 10+): scaffold, `.gitignore`/env example, types, storage, form, list, filters, styling, README. No empty or filler commits. |
| ≥ 2 branches | Suggested: `feature/task-crud`, `feature/filter-sort`, `feature/env-config`, `docs/readme`. Keep `main` always deployable. |
| Merge into main | Use a normal **merge commit** (no squash, no rebase) so the merge is visible in `git log --graph`. |
| Merge conflict | Create one deliberately, then resolve it (Section 7.3). |
| Push and pull | `git push -u origin <branch>`; after merging a PR on GitHub, `git switch main && git pull`. |
| ≥ 1 Pull Request | Merge feature branches through PRs on GitHub with a short title and description. |
| `.gitignore` | Section 7.1. |

### 7.3 How to produce and resolve a merge conflict (guided exercise)

Use a single-line constant that two branches both change, for example `APP_TAGLINE` in `src/config.ts` (or the page subtitle text).
1. From the same `main` commit, create `feature/a` and `feature/b`. On each, change the **same line** to different text and commit.
2. Merge `feature/a` into `main` (via PR).
3. On `feature/b`: `git merge main`. Git reports a conflict.
4. Open the file, find the markers `<<<<<<<`, `=======`, `>>>>>>>`, and edit to the final text with all markers removed.
5. `git add <file>` then `git commit` (the merge commit), push, and merge `feature/b` via PR.
6. Evidence: screenshot of the conflict markers, of the resolved file, and of `git log --graph --oneline --all`.

Do not delete branches before the owner has taken the evidence screenshots.

### 7.4 Rules for Claude regarding Git

- **Never** run `git commit`, `push`, `merge`, `rebase`, `reset`, or branch operations on your own initiative. When the owner asks, run them and briefly explain what each command does (this is a learning assignment).
- Never `push --force`, `reset --hard`, `rebase` published history, squash-merge, or rewrite/amend commits that were already pushed.
- Never fabricate history (no backdated commits, no filler commits to hit a count, no fake conflicts). The owner must be able to explain every commit.
- Proactively suggest good commit boundaries and messages ("good commit point: `Add task storage module`").
- Commit messages: concise English, imperative mood (e.g. `Add task edit mode`). One logical change per commit.

## 8. Environment variables (part of the 10 points)

- Vite only exposes variables prefixed with **`VITE_`** to client code via `import.meta.env`. They are **inlined into the public JS bundle**, so anything in them is readable by every visitor. **The app contains no secrets at all.** Never add a password, token, API key, or private URL, and never use the `VITE_` prefix for anything secret.
- `.env` is gitignored. **`.env.example` is committed** and documents every variable.

`.env.example` (and a matching local `.env`):
```
# Non-secret configuration only. Copy to .env and adjust.
VITE_APP_NAME=Todo Tugas Kuliah
VITE_APP_VERSION=1.0.0
VITE_COURSE_NAME=Pengembangan Aplikasi Web
```
(Owner: adjust the course name. Do not add any secret here.)

Typed access (TypeScript demonstration):
```ts
// src/vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_COURSE_NAME: string;
}

// src/config.ts: single place that reads env, with safe fallbacks
export interface AppConfig { appName: string; appVersion: string; courseName: string; }
export const config: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Todo Tugas Kuliah',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '0.0.0',
  courseName: import.meta.env.VITE_COURSE_NAME ?? '',
};
```
Use `config` only: the header brand and `document.title` show `appName`; the footer shows the course name and `v{appVersion}`.

**Deployment gotcha:** `.env` is not in the repo, so CI will not have it. The deploy workflow must provide the `VITE_*` values (workflow `env:` block or repository *Variables*, **not** Secrets, since they are public anyway), and `config.ts` keeps its fallbacks so the build never breaks.

## 9. Behavior spec

**Features (scope):** list tasks, add, edit, delete (with confirmation), toggle status, visible status per task, filter, sort, live stats, persistence across reloads. No extras.

**Status display (required by the brief):** every task shows a status badge as the first item in its meta row: **"Belum Selesai"** (`.badge-neutral`) or **"Selesai"** (`.badge-success`). Filter tabs are **Semua / Belum Selesai / Selesai**. Stats are **Total / Belum Selesai / Selesai**. Status text is derived by a function returning `TaskStatusLabel`.

**Validation:** title required (trim; 1–120 chars). Course max 80, notes max 500, deadline optional. Show inline errors (never `alert()`).

**Filter then sort.** Tab counts always reflect all tasks. Filter and sort are UI state only (not persisted).

**Sorting:**
- `deadline` (default): pending tasks first; by deadline ascending, no-deadline last; ties by priority (high → low), then `createdAt` ascending. Completed tasks after pending, by `completedAt` descending.
- `newest`: `createdAt` descending.
- `priority`: high → low; ties by deadline ascending (nulls last), then `createdAt` ascending.

**Edit mode:** edit loads the task into the top form, switches heading/button text, shows "Batal", scrolls the form into view, focuses the title. Cancel or save returns to add mode.

**Delete:** always confirm via the native `<dialog>`, then show a toast.

## 10. Deployment (30 points)

- Deploy `dist/` to GitHub Pages through a GitHub Actions workflow (`.github/workflows/deploy.yml`: checkout → setup Node → `npm ci` → `npm run build` with `VITE_*` env → upload Pages artifact → deploy). Check the current versions of the official actions and the Node version required by the installed Vite before writing it. Never commit `dist/` or `node_modules/`.
- **`base` in `vite.config.ts` must match the final URL**, otherwise JS/CSS 404 in production:
  - `https://<user>.github.io/<repo>/` or `https://hotsummerz.my.id/<repo>/` → `base: '/<repo>/'`
  - Own (sub)domain root, e.g. `https://todo.hotsummerz.my.id/` → `base: '/'`
- Verify with `npm run build && npm run preview`, then test on the deployed URL: add / edit / delete / reload persistence.
- The personal profile site (`hotsummerz/profil-diri`) links to this app. That link is added in the profile repo, a separate project with its own design system. Do not modify it from this repo.

## 11. Documentation (part of the 10 points)

### 11.1 README.md must contain
1. Short description and **live URL**
2. Features (matching Section 2.1)
3. Tech stack
4. Run locally: `npm install`, copy `.env.example` to `.env`, `npm run dev`; plus `build` and `preview`
5. Table of npm scripts and what each does
6. Table of environment variables (name, purpose, example) and the warning that `VITE_` values are public
7. TypeScript concepts → file map (Section 5)
8. Short Git workflow summary (branches used, PRs, how the conflict was resolved)
9. Screenshots: app UI, plus links to `docs/screenshots/` evidence files

### 11.2 "Catatan Teknis" section ON the website (required deliverable)

Add a section `#catatan-teknis` to the app page (below the task list, above the footer), titled **"Catatan Teknis"**, in Indonesian, written in the owner's voice, short and accurate. Build it from existing components only (`.section-header`, `.bento-card` with `h3`, stacked in one column with 16px gap); follow `DESIGN.md`. One card each for: **Git & GitHub**, **npm**, **TypeScript**, **Vite**, **Environment Variables**, **Compiler, Transpiler, dan Bundler**. Each card: 2–4 sentences plus one concrete example from this project. The owner must review the text and be able to explain it.

Facts to base the text on (do not contradict these):
- **Git**: version control that records history as commits; branches isolate work; merge combines branches; a conflict occurs when the same lines were changed differently; GitHub hosts the remote repo; push uploads commits, pull downloads and merges; a Pull Request proposes and reviews a merge.
- **npm**: package manager; `package.json` declares metadata, scripts, and dependencies; `package-lock.json` locks exact versions; `node_modules/` holds installed packages. Explain `dependencies`, `devDependencies`, and semver (`^`, `~`).
- **TypeScript**: typed superset of JavaScript; types catch errors during development; types are erased, and the browser runs plain JavaScript.
- **Vite**: development server (fast start, hot module replacement using native ES modules) and production build tool. It transpiles TypeScript but does not type-check; `tsc` does that.
- **Compiler** translates source code into a lower-level form (e.g. C to machine code). **Transpiler** translates between languages at a similar level (TypeScript → JavaScript; `tsc` also type-checks). **Bundler** merges many modules and assets into a few optimized files the browser can load (Vite's production build). Verify which bundler/transformer the installed Vite version uses before naming it.
- **Env variables**: configuration outside the code; `.env` stays local; `.env.example` documents the variables; `VITE_`-prefixed values are embedded in the public bundle, so they must never be secret.

## 12. Coding conventions

- TypeScript strict, **no `any`**, avoid `!` except inside a small typed helper like `qs<T extends Element>(selector)` that throws a clear error.
- `const` by default, pure functions for filter/sort/date logic, small functions, early returns.
- **DOM safety:** never put user-entered text into `innerHTML`; use `textContent`/`createElement`/`setAttribute`. `innerHTML` is allowed only for constant strings (icons from `icons.ts`).
- **State:** one store holds the task array; UI re-renders from state; no hidden state in the DOM. Event delegation on the list (`data-action="edit|delete"`; `change` for the checkbox).
- **Storage:** only `storage.ts` touches `localStorage`; wrap in `try/catch`; validate loaded data shape; on corrupted data start empty and do not overwrite storage until the user's first change; on write failure show the storage-error toast and keep working in memory.
- **Dates:** store deadlines as local `'YYYY-MM-DD'`. Never `new Date('YYYY-MM-DD')` (parsed as UTC, off-by-one-day bugs). Parse by splitting and `new Date(y, m - 1, d)`; "today" is local midnight; format with `Intl.DateTimeFormat('id-ID', …)`.
- IDs via `crypto.randomUUID()`.
- Naming: English identifiers; camelCase values/functions, PascalCase types, kebab-case CSS classes and filenames.
- Comments in English, only where intent is unclear (plus the `// TS concept:` markers). No commented-out code.
- UI text is Indonesian from the copy bank in `DESIGN.md` Section 7 (status labels per Section 9 here override it).
- Keep it compact; no classes/DI/patterns beyond what the app needs.

## 13. UI rules

**Read `DESIGN.md` before any UI or CSS work and follow it strictly.** Key points: CSS-variable tokens only, reuse existing components, light theme, 720px centered column, white cards with blue hover, Geist/Geist Mono, one breakpoint at 768px, accessibility requirements, Indonesian copy. Do not invent new styles, colors, or UI dependencies. If this file and `DESIGN.md` disagree on status labels or the status badge, this file wins.

## 14. Workflow rules for Claude

1. Before coding a feature, state a brief plan (files to touch). Keep changes small, focused, and commit-sized.
2. Do not add dependencies, frameworks, or build tooling without asking.
3. Do not change the data model or storage key/version without asking; if it changes, bump the storage `version` and add a migration.
4. Never weaken TypeScript strictness to silence errors; fix the types.
5. Never put secrets, tokens, or real credentials anywhere (code, `.env.example`, README, workflow files, screenshots).
6. Match existing style; do not reformat unrelated code.
7. When a requirement is ambiguous or the brief might be affected, ask a short question instead of guessing.
8. Git rules in Section 7.4 apply at all times.

## 15. Definition of done

**App**
- [ ] `npm run build` succeeds with no TS errors; `npm run preview` works with the configured `base`
- [ ] Add, edit, delete (with confirmation), toggle status, filter, sort; data persists after reload
- [ ] Every task visibly shows "Belum Selesai" or "Selesai"
- [ ] Inline validation; empty states for each filter; deadline states correct (past, today, tomorrow)
- [ ] Responsive at 320px and desktop; keyboard usable; focus visible; matches `DESIGN.md`
- [ ] Live on the personal website; the profile site links to it

**Git and GitHub**
- [ ] Repo on GitHub; `.gitignore` in place; no `.env` tracked
- [ ] ≥ 5 meaningful commits; ≥ 2 branches; merges visible in `git log --graph`
- [ ] A merge conflict created and resolved; push and pull done; ≥ 1 PR merged

**TypeScript, npm, Vite, env**
- [ ] All six TS concepts present with `// TS concept:` markers
- [ ] `package.json` scripts work; `package-lock.json` committed; semver and dependencies vs devDependencies explained
- [ ] `.env` used by `config.ts`; `.env.example` committed; CI provides `VITE_*` values; no secrets anywhere

**Documentation and submission**
- [ ] README complete (Section 11.1); "Catatan Teknis" section live on the site (Section 11.2)
- [ ] Evidence screenshots in `docs/screenshots/`: branches, merge, Pull Request, conflict resolution
- [ ] Submission ready: website link, repo link, screenshots, explanation on the website

## 16. Out of scope (unless the owner asks)

User accounts, backend/API, cloud sync, notifications/reminders, drag-and-drop reordering, dark mode, PWA/offline, i18n, testing frameworks, analytics, any use of real secrets.