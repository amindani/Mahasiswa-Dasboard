# Website Mahasiswa — Muhammad Amin Ramdani

Website portofolio akademik statis untuk menampilkan materi dan tugas kuliah. Dibuat dengan HTML, CSS, dan JavaScript sehingga dapat di-host gratis menggunakan GitHub Pages.

## File penting
- `index.html` — struktur halaman dan profil mahasiswa.
- `style.css` — tampilan responsif dan mode gelap.
- `app.js` — pencarian, penghitung publikasi, menu, dan tema.
- `content.js` — daftar materi dan tugas yang dipublikasikan.
- `assets/` — tempat menyimpan PDF/DOCX atau berkas tugas/materi.

## Cara menambahkan materi atau tugas
1. Simpan PDF/DOCX di folder `assets/`.
2. Buka `content.js`.
3. Tambahkan objek baru ke `materiKuliah` atau `tugasKuliah`, mengikuti contoh yang sudah ada di komentar.
4. Isi `file` dengan alamat relatif, misalnya `assets/materi-pertemuan-1.pdf`.
5. Simpan, lalu unggah perubahan ke GitHub (commit dan push). Setelah GitHub Pages memperbarui situs, publikasi akan terlihat oleh dosen dan pengunjung.

Contoh materi:
```js
const materiKuliah = [
  {
    judul: "Pengantar Pemrograman",
    mataKuliah: "Algoritma dan Pemrograman",
    tanggal: "2026-10-24",
    deskripsi: "Ringkasan materi pertemuan pertama.",
    file: "assets/pengantar-pemrograman.pdf",
    tipe: "PDF"
  }
];
```

Contoh tugas:
```js
const tugasKuliah = [
  {
    judul: "Tugas 1 — Dasar Pemrograman",
    mataKuliah: "Algoritma dan Pemrograman",
    tanggal: "2026-10-24",
    deskripsi: "Latihan dasar variabel, tipe data, dan percabangan.",
    file: "assets/tugas-1.pdf",
    tipe: "PDF",
    status: "Selesai"
  }
];
```

## Cara mengaktifkan GitHub Pages
1. Buka repository `Mahasiswa-Dasboard` di GitHub.
2. Masuk ke **Settings → Pages**.
3. Di bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
5. Tunggu beberapa menit. Alamat situs akan tampil pada halaman Settings → Pages.

> Catatan: situs ini bersifat statis. Form unggah langsung dari halaman web tidak disediakan karena tanpa backend/database, unggahan dari browser tidak akan tersimpan untuk semua pengunjung. Untuk mempublikasikan materi/tugas, tambahkan berkas ke repository dan daftarkan di `content.js`.
