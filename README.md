# Todo Tugas Kuliah

Aplikasi web sederhana untuk mengelola daftar tugas kuliah, dibangun dengan TypeScript dan Vite sebagai tugas Mata Kuliah Pengembangan Aplikasi Web.

---

## Fitur

- ✅ Menampilkan daftar tugas kuliah
- ✅ Menambahkan tugas baru dengan detail lengkap (judul, mata kuliah, tenggat, prioritas, catatan)
- ✅ Mengedit dan menghapus tugas
- ✅ Menampilkan status tugas: **"Belum Selesai"** / **"Selesai"**
- ✅ Filter tugas (Semua / Aktif / Selesai)
- ✅ Pengurutan tugas (tenggat terdekat / terbaru ditambahkan / prioritas tertinggi)
- ✅ Tampilan rapi dan responsif (mobile hingga desktop)
- ✅ Persistensi data dengan `localStorage`

---

## Tech Stack

- **TypeScript** (strict mode) - Typed superset of JavaScript
- **Vite** - Development server dan build tool
- **Vanilla DOM APIs** - Tanpa framework (React/Vue/Svelte)
- **Plain CSS** - Tanpa framework CSS (Tailwind/Bootstrap)
- **localStorage** - Persistensi data di browser
- **Google Fonts** - Geist (sans) dan Geist Mono (monospace)

---

## Menjalankan Aplikasi Secara Lokal

### Prerequisites

- Node.js versi 18 atau lebih baru
- npm (terinstall otomatis dengan Node.js)

### Langkah-langkah

1. **Clone repository:**
   ```bash
   git clone https://github.com/hotsummerz/ToDoApp.git
   cd "To Do App"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Salin file environment variables:**
   ```bash
   cp .env.example .env
   ```
   File `.env` sudah berisi konfigurasi default yang dapat digunakan langsung. Anda dapat mengubah nilai-nilai di dalamnya sesuai kebutuhan (misalnya nama mata kuliah).

4. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173/` (atau port lain yang tersedia).

5. **Build untuk production:**
   ```bash
   npm run build
   ```
   Hasil build akan tersimpan di folder `dist/`.

6. **Preview production build:**
   ```bash
   npm run preview
   ```
   Preview hasil build di `http://localhost:4173/`.

---

## npm Scripts

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| `dev` | `vite` | Menjalankan development server dengan hot module replacement (HMR) |
| `build` | `tsc && vite build` | Type-check dengan TypeScript compiler, lalu build untuk production |
| `preview` | `vite preview` | Preview hasil production build secara lokal |
| `typecheck` | `tsc --noEmit` | Memeriksa TypeScript errors tanpa menghasilkan file output |

**Catatan penting:** Script `build` menjalankan `tsc` terlebih dahulu karena Vite hanya *transpile* TypeScript tanpa melakukan type-checking. Jangan hapus `tsc` dari script `build`.

---

## Environment Variables

| Variable | Tujuan | Contoh |
|----------|--------|--------|
| `VITE_APP_NAME` | Nama aplikasi yang ditampilkan di header dan title | `Todo Tugas Kuliah` |
| `VITE_APP_VERSION` | Versi aplikasi yang ditampilkan di footer | `1.0.0` |
| `VITE_COURSE_NAME` | Nama mata kuliah yang ditampilkan di footer | `Pengembangan Aplikasi Web` |

### Penting tentang Environment Variables

- **Semua variabel dengan prefix `VITE_` akan di-embed ke dalam JavaScript bundle public** dan dapat dibaca oleh siapa saja yang mengakses website.
- **JANGAN PERNAH** menyimpan password, API keys, atau data rahasia dalam variabel `VITE_*`.
- File `.env` tidak di-commit ke Git (sudah ada di `.gitignore`).
- File `.env.example` di-commit sebagai template dan hanya berisi contoh nilai non-rahasia.
- Di CI/CD (GitHub Actions), nilai `VITE_*` disediakan sebagai environment variables atau repository Variables (bukan Secrets, karena memang public).

### Penjelasan Dependencies

#### dependencies vs devDependencies

- **`dependencies`**: Package yang dibutuhkan saat aplikasi *berjalan* (runtime). Contoh: library UI, state management, utility functions yang di-bundle ke aplikasi final.
- **`devDependencies`**: Package yang hanya dibutuhkan saat *development* dan *build*. Contoh: TypeScript compiler, Vite, linters, testing frameworks.

#### Mengapa `dependencies` kosong di project ini?

Aplikasi ini menggunakan **vanilla TypeScript dan DOM APIs**, tanpa library eksternal. Semua yang dibutuhkan sudah built-in di browser (DOM manipulation, localStorage, fetch, dll). TypeScript dan Vite hanya digunakan untuk development dan build process, maka keduanya ada di `devDependencies`.

#### Semantic Versioning (semver)

Format: `MAJOR.MINOR.PATCH` (contoh: `1.2.3`)

- **MAJOR**: Perubahan breaking (tidak kompatibel dengan versi sebelumnya)
- **MINOR**: Fitur baru yang backward-compatible
- **PATCH**: Bug fixes yang backward-compatible

**Range syntax:**
- `^1.2.3` → Boleh update MINOR dan PATCH (contoh: `1.9.9` OK, `2.0.0` tidak)
- `~1.2.3` → Boleh update PATCH saja (contoh: `1.2.9` OK, `1.3.0` tidak)
- `1.2.3` → Exact version, tidak boleh update sama sekali

Contoh dari `package.json` project ini:
- `"typescript": "^5.6.0"` → Akan menginstall versi terbaru yang masih `5.x.x` (misalnya `5.7.2`)
- `"vite": "^6.0.0"` → Akan menginstall versi terbaru yang masih `6.x.x`

---

## Konsep TypeScript yang Didemonstrasikan

Project ini mendemonstrasikan semua konsep TypeScript yang diminta dalam tugas, dengan marker comment `// TS concept: <nama>` untuk memudahkan pencarian.

| Konsep | File | Contoh Penggunaan |
|--------|------|-------------------|
| **Primitive types** | `src/types.ts:8-11` | `id: string`, `createdAt: number`, `completed: boolean` |
| **Arrays** | `src/types.ts:15` | `tasks: Task[]` dalam `StoredData` interface |
| **Interface** | `src/types.ts:7-16` | `interface Task`, `interface StoredData`, `interface AppConfig` |
| **Type alias** | `src/types.ts:2-5` | `type Priority`, `type Filter`, `type SortKey`, `type TaskStatusLabel` |
| **Union types** | `src/types.ts:2-5,10` | `'low' \| 'medium' \| 'high'`, `string \| null` |
| **Generics** | `src/types.ts:19`, `src/utils/sort.ts:6`, `src/storage.ts:22` | `Result<T>`, `sortBy<T>()`, `loadTasks(): Result<readonly Task[]>` |

**Penjelasan singkat setiap konsep:**

- **Primitive types**: Tipe dasar JavaScript (string, number, boolean) dengan anotasi tipe TypeScript.
- **Arrays**: Tipe untuk kumpulan elemen dengan tipe yang sama, ditulis `Type[]` atau `Array<Type>`.
- **Interface**: Blueprint untuk struktur object dengan properti dan tipe-tipenya.
- **Type alias**: Nama alternatif untuk tipe, berguna untuk union types dan tipe kompleks.
- **Union types**: Tipe yang bisa bernilai salah satu dari beberapa kemungkinan (`A | B | null`).
- **Generics**: Tipe yang dapat di-parameterisasi, berguna untuk membuat fungsi/tipe yang reusable dengan berbagai tipe data.

---

## Struktur Project

```
/
├── index.html              # Skeleton HTML
├── vite.config.ts          # Vite configuration (base path)
├── tsconfig.json           # TypeScript configuration (strict mode)
├── package.json            # Project metadata, scripts, dependencies
├── package-lock.json       # Locked dependency versions
├── .gitignore              # Files yang tidak di-track Git
├── .env                    # Environment variables (local, tidak di-commit)
├── .env.example            # Template environment variables (di-commit)
├── README.md               # Dokumentasi ini
└── src/
    ├── main.ts             # Entry point: wiring, event listeners
    ├── vite-env.d.ts       # TypeScript types untuk import.meta.env
    ├── config.ts           # Membaca environment variables
    ├── style.css           # Global styles (design system)
    ├── types.ts            # Type definitions (Task, Priority, dll)
    ├── storage.ts          # localStorage read/write dengan validation
    ├── store.ts            # App state management + actions
    ├── utils/
    │   ├── date.ts         # Local date parsing, formatting, relative dates
    │   └── sort.ts         # Filter dan sort logic (pure functions)
    └── ui/
        ├── render.ts       # Render stats, task list, filter tabs
        ├── form.ts         # Form handling, validation, edit mode
        ├── dialog.ts       # Delete confirmation dialog
        ├── toast.ts        # Toast notifications
        ├── icons.ts        # SVG icon constants
        └── reveal.ts       # Page block scroll reveal animation
```

---

## Catatan Pengembangan

### Prinsip yang Digunakan

- **Type safety**: TypeScript strict mode, no `any`
- **Pure functions**: Filter, sort, date utils tidak memiliki side effects
- **Single source of truth**: State di-manage di satu tempat (`store.ts`)
- **DOM safety**: User input di-render dengan `textContent`, bukan `innerHTML`
- **Accessibility**: Labels, focus states, keyboard navigation, `aria-*` attributes
- **Progressive enhancement**: App berjalan tanpa JavaScript libraries, hanya DOM APIs

### Build Process

1. **TypeScript Compiler (`tsc`)**: Type-check seluruh codebase
2. **Vite Build**: Transpile TypeScript → JavaScript, bundle modules, minify, optimize assets
3. **Output**: Static files di folder `dist/` siap di-deploy

Vite menggunakan **esbuild** untuk transpiling TypeScript (sangat cepat) dan **Rollup** untuk production bundling (tree-shaking, code splitting).

---

## License

Project ini dibuat untuk keperluan tugas akademik Mata Kuliah Pengembangan Aplikasi Web.

---

## Kontak

Untuk pertanyaan atau feedback, silakan buka issue di repository ini atau hubungi melalui [website pribadi](https://hotsummerz.my.id).
