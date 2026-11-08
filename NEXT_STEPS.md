# LANGKAH SELANJUTNYA

Project sudah di-scaffold lengkap dengan semua file yang dibutuhkan. Ikuti langkah-langkah berikut untuk menyelesaikan tugas.

---

## ✅ Yang Sudah Selesai

- [x] Struktur project (TypeScript + Vite)
- [x] Semua module TypeScript (types, storage, store, utils, UI)
- [x] Stylesheet lengkap sesuai DESIGN.md
- [x] HTML skeleton
- [x] Configuration files (tsconfig.json, vite.config.ts, .env)
- [x] .gitignore
- [x] GitHub Actions workflow untuk deployment
- [x] README.md dengan dokumentasi lengkap
- [x] Folder untuk screenshots evidence

---

## 📋 Yang Perlu Dilakukan

### 1. Install Dependencies & Test Aplikasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser ke `http://localhost:5173/` dan test semua fitur:
- Tambah tugas
- Edit tugas
- Hapus tugas (dengan dialog konfirmasi)
- Toggle status (checkbox)
- Filter (Semua / Aktif / Selesai)
- Sort (tenggat / terbaru / prioritas)
- Reload halaman (pastikan data persist)

**Jika ada error, jalankan:**
```bash
npm run typecheck
```

### 2. Git Workflow (25 poin)

#### A. Inisialisasi Repository

```bash
# Inisialisasi git
git init

# Add semua file (kecuali yang di .gitignore)
git add .

# Commit pertama
git commit -m "Initial commit: Project scaffold with TypeScript and Vite"
```

#### B. Buat Repository di GitHub

1. Buka GitHub → New Repository
2. Nama: `To-Do` atau `todo-tugas-kuliah`
3. **Jangan** initialize dengan README (sudah ada)
4. Create repository
5. Copy URL repository

```bash
# Link ke remote
git remote add origin <URL_REPOSITORY_ANDA>

# Push ke GitHub
git branch -M main
git push -u origin main
```

#### C. Buat dan Merge Branches

**Branch 1: feature/storage-utils**

```bash
# Buat branch baru
git checkout -b feature/storage-utils

# Buat perubahan kecil (misalnya tambah comment di storage.ts)
# Edit: src/storage.ts - tambahkan comment di line 1

git add src/storage.ts
git commit -m "Add documentation comments to storage module"
git push -u origin feature/storage-utils
```

Buat **Pull Request** di GitHub dari `feature/storage-utils` → `main`, lalu merge.

**Branch 2 & 3: Sengaja Buat Conflict**

```bash
# Kembali ke main, pull hasil merge
git checkout main
git pull

# Buat branch A
git checkout -b feature/update-subtitle-a

# Edit index.html line 31 (page subtitle)
# Ganti teks subtitle dengan: "Kelola tugas kuliahmu dengan mudah dan terorganisir."

git add index.html
git commit -m "Update page subtitle for clarity"
git push -u origin feature/update-subtitle-a
```

```bash
# Kembali ke main (SEBELUM merge branch A)
git checkout main

# Buat branch B dari main yang sama
git checkout -b feature/update-subtitle-b

# Edit index.html line 31 (SAMA seperti branch A)
# Ganti teks subtitle dengan: "Catat dan selesaikan semua tugas kuliahmu di satu tempat."

git add index.html
git commit -m "Improve page subtitle text"
git push -u origin feature/update-subtitle-b
```

**Merge branch A dulu:**

Buat Pull Request di GitHub: `feature/update-subtitle-a` → `main`, merge.

```bash
git checkout main
git pull  # Dapat perubahan dari branch A
```

**Merge branch B (akan conflict):**

```bash
git checkout feature/update-subtitle-b
git merge main
```

Git akan melaporkan conflict di `index.html`. 

**Resolve conflict:**

1. Buka `index.html`
2. Cari marker:
   ```
   <<<<<<< HEAD
   Catat dan selesaikan semua tugas kuliahmu di satu tempat.
   =======
   Kelola tugas kuliahmu dengan mudah dan terorganisir.
   >>>>>>> main
   ```

3. **SCREENSHOT conflict markers** → simpan sebagai `docs/screenshots/conflict-markers.png`

4. Pilih teks final (gabungan atau salah satu), hapus semua marker:
   ```html
   <p class="page-subtitle">Catat, pantau, dan selesaikan tugas kuliahmu dalam satu tempat.</p>
   ```

5. **SCREENSHOT file setelah resolve** → simpan sebagai `docs/screenshots/conflict-resolved.png`

6. Commit merge:
   ```bash
   git add index.html
   git commit -m "Resolve merge conflict in page subtitle"
   git push
   ```

7. Buat Pull Request di GitHub: `feature/update-subtitle-b` → `main`, merge.

**Branch 4: docs/screenshots**

```bash
git checkout main
git pull

git checkout -b docs/screenshots

# Add screenshot files ke docs/screenshots/
git add docs/screenshots/
git commit -m "Add evidence screenshots for Git workflow"
git push -u origin docs/screenshots
```

Buat Pull Request, merge.

#### D. Ambil Screenshots Evidence

```bash
# List branches
git branch -a
# Screenshot → docs/screenshots/branches.png

# Log graph
git log --graph --oneline --all --decorate
# Screenshot → docs/screenshots/commits.png

# Di GitHub: screenshot halaman Pull Requests
# Screenshot → docs/screenshots/pull-requests.png

# Screenshot merge commit di Git graph
git log --graph --oneline --all
# Screenshot → docs/screenshots/merge-commit.png
```

**Verifikasi:**
- ✅ Minimal 5 commits (seharusnya > 5)
- ✅ Minimal 2 branches (seharusnya 4+)
- ✅ Merge commits visible di `git log --graph`
- ✅ 1 conflict resolved
- ✅ Push & pull done
- ✅ Minimal 1 Pull Request (seharusnya 4+)

### 3. Verifikasi TypeScript Concepts (20 poin)

Buka file-file berikut dan verifikasi marker `// TS concept:` ada:

- **Primitive types**: `src/types.ts:8-11`
- **Arrays**: `src/types.ts:15`
- **Interface**: `src/types.ts:7-16`, `src/vite-env.d.ts:4-8`
- **Type alias**: `src/types.ts:2-5`
- **Union types**: `src/types.ts:2-5, 10`
- **Generics**: `src/types.ts:19`, `src/storage.ts:22`, `src/utils/sort.ts:6`

Update README.md jika perlu perbaiki line numbers.

### 4. Build & Preview (15 poin)

```bash
# Type-check
npm run typecheck

# Build production
npm run build

# Preview
npm run preview
```

Buka `http://localhost:4173/` dan test lagi. Pastikan:
- Assets load (CSS, JS)
- Fungsi CRUD works
- Data persist setelah reload

### 5. Deploy ke GitHub Pages (30 poin)

#### A. Enable GitHub Pages

1. Repository Settings → Pages
2. Source: **GitHub Actions**
3. Save

#### B. Push to main (trigger workflow)

```bash
git checkout main
git push
```

Workflow akan run otomatis. Cek di tab **Actions** di GitHub.

#### C. Verifikasi Deployment

Setelah workflow selesai (hijau ✅):

1. Buka URL: `https://<username>.github.io/To-Do/`
2. Test aplikasi production
3. Ambil screenshot → `docs/screenshots/app-desktop.png`, `app-mobile.png`

#### D. Update README

Edit `README.md`, ganti:
```markdown
**Live URL:** [https://hotsummerz.my.id/To-Do/](https://hotsummerz.my.id/To-Do/)
```

Dengan URL GitHub Pages yang sebenarnya.

### 6. Link dari Website Pribadi

Di repository `hotsummerz/profil-diri`, tambahkan link ke aplikasi To-Do ini.

### 7. Submission

Kumpulkan:

1. ✅ **Link website** (GitHub Pages URL)
2. ✅ **Link repository** (GitHub repo URL)
3. ✅ **Screenshots** (di folder `docs/screenshots/`)
4. ✅ **Penjelasan di website** _(belum ada, lihat langkah 8)_

### 8. Tambahkan "Catatan Teknis" di Website (10 poin)

Edit `index.html`, tambahkan section sebelum `<footer>`:

```html
<section class="section-block animate-fade-in" aria-labelledby="catatan-title" id="catatan-teknis">
  <header class="section-header"><h2 id="catatan-title">Catatan Teknis</h2></header>
  
  <div style="display: grid; gap: 16px;">
    <div class="bento-card">
      <h3>Git & GitHub</h3>
      <p>Git adalah version control system yang merekam perubahan kode dalam bentuk commits. Setiap commit adalah snapshot dari project pada waktu tertentu. Branch memungkinkan pengembangan fitur secara terisolasi tanpa mengganggu branch utama. Merge menggabungkan perubahan dari satu branch ke branch lain. Conflict terjadi ketika dua branch mengubah baris yang sama; diselesaikan dengan memilih perubahan mana yang dipertahankan. GitHub adalah platform hosting untuk repository Git yang memungkinkan kolaborasi. Push mengunggah commits lokal ke remote repository, pull mengunduh dan merge perubahan dari remote. Pull Request adalah cara untuk mengusulkan dan mereview perubahan sebelum di-merge.</p>
      <p><strong>Contoh:</strong> Project ini menggunakan 4+ branches untuk mengembangkan fitur secara terpisah, dengan merge conflict yang disengaja pada file <code>index.html</code> untuk latihan.</p>
    </div>

    <div class="bento-card">
      <h3>npm</h3>
      <p>npm (Node Package Manager) adalah package manager untuk JavaScript. <code>package.json</code> berisi metadata project, daftar dependencies, dan npm scripts. <code>package-lock.json</code> mengunci versi exact dari setiap dependency agar instalasi konsisten di semua environment. <code>node_modules/</code> menyimpan semua package yang terinstall. Dependencies adalah package yang dibutuhkan saat runtime (di-bundle ke aplikasi final), sedangkan devDependencies hanya dibutuhkan saat development dan build (TypeScript, Vite). Semantic versioning (semver) menggunakan format MAJOR.MINOR.PATCH: <code>^1.2.3</code> boleh update minor dan patch, <code>~1.2.3</code> hanya patch, tanpa prefix berarti exact version.</p>
      <p><strong>Contoh:</strong> Project ini tidak memiliki runtime dependencies karena hanya menggunakan vanilla DOM APIs. TypeScript dan Vite ada di devDependencies dengan range <code>^5.6.0</code> dan <code>^6.0.0</code>.</p>
    </div>

    <div class="bento-card">
      <h3>TypeScript</h3>
      <p>TypeScript adalah typed superset dari JavaScript yang menambahkan sistem tipe statis. Tipe membantu menangkap error saat development (misalnya passing string ke parameter yang expect number) sebelum kode dijalankan. TypeScript di-transpile menjadi JavaScript biasa yang browser dapat eksekusi; tipe-tipe tidak ada di runtime. Strict mode memaksa pengecekan tipe yang lebih ketat, mencegah bug umum seperti <code>null</code>/<code>undefined</code> errors.</p>
      <p><strong>Contoh:</strong> <code>interface Task</code> mendefinisikan struktur object task dengan tipe eksplisit untuk setiap property. Generic <code>Result&lt;T&gt;</code> digunakan untuk return values yang bisa success atau error.</p>
    </div>

    <div class="bento-card">
      <h3>Vite</h3>
      <p>Vite adalah build tool modern yang menyediakan development server dengan Hot Module Replacement (HMR) sangat cepat menggunakan native ES modules. Development server start instant tanpa bundling. Production build menggunakan Rollup untuk bundling, tree-shaking (menghapus kode yang tidak terpakai), dan minification. Vite dapat transpile TypeScript ke JavaScript menggunakan esbuild (sangat cepat), tetapi tidak melakukan type-checking; untuk itu kita harus menjalankan <code>tsc</code> secara terpisah.</p>
      <p><strong>Contoh:</strong> Script <code>build</code> menjalankan <code>tsc && vite build</code> untuk memastikan tidak ada TypeScript errors sebelum bundling production.</p>
    </div>

    <div class="bento-card">
      <h3>Environment Variables</h3>
      <p>Environment variables memisahkan konfigurasi dari kode, sehingga nilai bisa berbeda per environment (development, production) tanpa mengubah source code. File <code>.env</code> menyimpan variables lokal dan tidak di-commit ke Git. <code>.env.example</code> adalah template yang di-commit, mendokumentasikan variable apa saja yang dibutuhkan tanpa nilai sensitif. Di Vite, hanya variables dengan prefix <code>VITE_</code> yang di-expose ke client code, dan nilainya di-embed ke JavaScript bundle saat build. Karena itu, <strong>JANGAN PERNAH</strong> menyimpan password atau API key di <code>VITE_*</code> variables.</p>
      <p><strong>Contoh:</strong> <code>VITE_APP_NAME</code>, <code>VITE_APP_VERSION</code>, dan <code>VITE_COURSE_NAME</code> digunakan untuk konfigurasi public yang ditampilkan di UI.</p>
    </div>

    <div class="bento-card">
      <h3>Compiler, Transpiler, dan Bundler</h3>
      <p><strong>Compiler</strong> menerjemahkan source code ke bentuk lower-level atau bahasa lain (contoh: C ke machine code, Java ke bytecode). <strong>Transpiler</strong> menerjemahkan source code ke bahasa lain pada level abstraksi yang sama (contoh: TypeScript ke JavaScript, Sass ke CSS). TypeScript Compiler (<code>tsc</code>) adalah transpiler yang juga melakukan type-checking. <strong>Bundler</strong> menggabungkan banyak file module dan assets menjadi sedikit file yang dioptimasi untuk browser, dengan fitur seperti tree-shaking, code splitting, dan minification.</p>
      <p><strong>Contoh:</strong> <code>tsc</code> type-check dan transpile TypeScript. Vite menggunakan <strong>esbuild</strong> untuk transpiling cepat saat development, dan <strong>Rollup</strong> untuk production bundling.</p>
    </div>
  </div>
</section>
```

Commit dan push perubahan.

---

## ✅ Checklist Final

Sebelum submit, pastikan:

- [ ] Aplikasi berjalan di localhost (`npm run dev`)
- [ ] Build berhasil tanpa error (`npm run build`)
- [ ] Preview production works (`npm run preview`)
- [ ] Repository di GitHub dengan ≥5 commits, ≥2 branches
- [ ] Merge conflict created & resolved (ada screenshot)
- [ ] Pull Requests created & merged (ada screenshot)
- [ ] `.gitignore` works (no `node_modules/`, `dist/`, `.env` di Git)
- [ ] `.env.example` committed
- [ ] Deployed ke GitHub Pages
- [ ] Aplikasi accessible di URL public
- [ ] README lengkap dengan dokumentasi
- [ ] Section "Catatan Teknis" ada di halaman website
- [ ] Screenshots evidence lengkap di `docs/screenshots/`
- [ ] Link dari website pribadi menuju aplikasi ini

---

## 🚨 Troubleshooting

### Build Error: TypeScript Errors

```bash
npm run typecheck
```

Perbaiki error yang muncul, lalu build lagi.

### Deploy 404 / Assets Not Loading

Check `vite.config.ts` → `base` harus match dengan path di GitHub Pages:
- Repo name: `To-Do` → `base: '/To-Do/'`
- Custom domain root → `base: '/'`

### localStorage Data Hilang

Data tersimpan per-origin. Jika URL berubah (localhost vs production), data tidak akan ter-carry over. Ini normal.

### Merge Conflict Tidak Muncul

Pastikan kedua branch mengubah **line yang sama persis** di file yang sama, dan branch kedua di-create dari commit yang sama dengan branch pertama (sebelum branch pertama di-merge).

---

**Selamat mengerjakan! 🚀**
