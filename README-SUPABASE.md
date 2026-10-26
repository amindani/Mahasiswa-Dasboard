# Mahasiswa-Dasboard + Supabase

## Setup singkat
1. Buat project di Supabase.
2. Di Storage buat bucket `materi-tugas` dan aktifkan Public bucket agar pengunjung bisa melihat/mengunduh berkas.
3. Di Authentication nonaktifkan pendaftaran publik, lalu buat akun admin manual melalui Authentication → Users.
4. Jalankan `supabase-setup.sql` melalui SQL Editor.
5. Buka Project Settings → API / Data API dan salin Project URL serta anon/public key. Masukkan ke `supabase-config.js`. Jangan pernah menaruh service_role/secret key di frontend.
6. Upload semua file repo ke branch GitHub Pages yang sama: `index.html`, `style.css`, `app.js`, `content.js`, `assets/`, `supabase-config.js`, `admin.html`, `admin.js`, dan `supabase-setup.sql`.
7. Buka `https://amindani.github.io/Mahasiswa-Dasboard/admin.html`, login, lalu upload.

File lama dalam `assets` GitHub tetap dibaca. File baru dari admin tersimpan di Supabase Storage dan muncul otomatis di daftar Materi & Tugas. Format yang didukung: PDF, DOC/DOCX, PPT/PPTX, XLS/XLSX, TXT, ZIP. Batas awal antarmuka 50 MB/file, tetapi batas Supabase juga berlaku.

Catatan: kebijakan SQL mengizinkan user Auth yang berhasil login untuk upload. Karena itu matikan sign-up publik dan jangan buat akun selain admin. Untuk keamanan tambahan, bisa dibuat tabel role/admin yang lebih ketat.
