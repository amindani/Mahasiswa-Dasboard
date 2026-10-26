# Website Mahasiswa — Muhammad Amin Ramdani

Website portofolio akademik statis untuk GitHub Pages.

## Publikasi materi dan tugas otomatis

1. Buka repository GitHub `Mahasiswa-Dasboard`.
2. Masuk ke folder `assets`.
3. Klik **Add file → Upload files**.
4. Pilih file materi/tugas (PDF, DOC/DOCX, PPT/PPTX, XLS/XLSX, TXT, atau ZIP).
5. Klik **Commit changes**.
6. Tunggu GitHub Pages memperbarui website, lalu muat ulang website.

File di folder `assets` akan dibaca otomatis melalui GitHub API. Tidak perlu mengedit `content.js` setiap kali mengunggah file. Nama file menjadi judul kartu. File dengan nama yang mengandung kata `tugas`, `laporan`, `makalah`, `praktikum`, `UTS`, `UAS`, `kuis`, `quiz`, atau `ujian` akan masuk ke bagian **Tugas Kuliah**. File lainnya masuk ke **Materi Kuliah**.

Contoh nama file:
- `Materi_Algoritma_Pertemuan_1.pdf` → Materi Kuliah
- `Tugas_IMK.pdf` → Tugas Kuliah

## Catatan

- Repository harus **public** agar GitHub API dapat membaca folder `assets` tanpa login.
- Jika file baru belum muncul, pastikan upload sudah di-commit dan tunggu sebentar sebelum memuat ulang website.
- Jangan unggah dokumen yang memuat data pribadi/sensitif karena repository publik dapat diakses orang lain.
- Website ini hanya menampilkan tautan ke berkas yang sudah diunggah; tidak menyediakan form upload langsung dari halaman website.
