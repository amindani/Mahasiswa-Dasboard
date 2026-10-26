const $ = (selector) => document.querySelector(selector);

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function formatDate(value) {
  if (!value) return 'Berkas dari folder assets';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return escapeHTML(value);
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function renderPosts(items, containerId, query, kind) {
  const container = document.getElementById(containerId);
  const normalizedQuery = (query || '').trim().toLowerCase();
  const filtered = items.filter((item) => [item.judul, item.mataKuliah, item.deskripsi, item.tipe]
    .some((value) => String(value || '').toLowerCase().includes(normalizedQuery)));

  document.getElementById(kind + 'Result').textContent = `${filtered.length} ${kind === 'materi' ? 'materi' : 'tugas'}`;
  if (!filtered.length) {
    container.innerHTML = `<article class="empty-state"><div class="empty-icon"><span class="material-icons-sharp">${kind === 'materi' ? 'menu_book' : 'assignment'}</span></div><h3>Belum ada ${kind === 'materi' ? 'materi kuliah' : 'tugas kuliah'}</h3><p>Unggah file ke folder <code>assets</code> di GitHub. File akan terdeteksi otomatis setelah website diperbarui.</p></article>`;
    return;
  }

  container.innerHTML = filtered.map((item) => {
    const file = item.file ? escapeHTML(item.file) : '';
    const type = escapeHTML(item.tipe || 'Dokumen');
    const status = kind === 'tugas' && item.status ? `<span class="post-status">${escapeHTML(item.status)}</span>` : '';
    const fileButton = file
      ? `<a class="post-link" href="${file}" target="_blank" rel="noopener"><span class="material-icons-sharp">open_in_new</span> Buka / unduh berkas <span class="material-icons-sharp arrow">arrow_outward</span></a>`
      : `<span class="post-link disabled-link"><span class="material-icons-sharp">info</span> Berkas belum ditambahkan</span>`;
    return `<article class="post-card"><div class="post-card-top"><div class="file-icon ${kind === 'tugas' ? 'file-orange' : ''}"><span class="material-icons-sharp">${kind === 'materi' ? 'description' : 'task'}</span></div><span class="file-type">${type}</span></div><div class="post-meta"><span class="material-icons-sharp">folder_open</span>${formatDate(item.tanggal)}</div><h3>${escapeHTML(item.judul || 'Tanpa judul')}</h3><div class="subject-name">${escapeHTML(item.mataKuliah || 'Dokumen perkuliahan')}</div><p class="post-description">${escapeHTML(item.deskripsi || 'File yang diunggah ke folder assets repository mahasiswa.')}</p><div class="post-card-bottom">${fileButton}${status}</div></article>`;
  }).join('');
}

let daftarMateri = Array.isArray(window.materiKuliah) ? [...window.materiKuliah] : [];
let daftarTugas = Array.isArray(window.tugasKuliah) ? [...window.tugasKuliah] : [];

function refreshLists() {
  $('#materiCount').textContent = daftarMateri.length;
  $('#tugasCount').textContent = daftarTugas.length;
  renderPosts(daftarMateri, 'materiList', $('#materiSearch').value, 'materi');
  renderPosts(daftarTugas, 'tugasList', $('#tugasSearch').value, 'tugas');
}

// Membaca isi folder assets langsung dari GitHub API. Jadi tidak perlu mengedit content.js setiap upload.
async function loadFilesFromAssets() {
  const repoApi = 'https://api.github.com/repos/amindani/Mahasiswa-Dasboard/contents/assets?ref=main';
  const supportedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'zip'];
  try {
    const response = await fetch(repoApi, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API merespons ${response.status}`);
    const files = await response.json();
    if (!Array.isArray(files)) throw new Error('Isi folder assets tidak dapat dibaca.');

    const autoMateri = [];
    const autoTugas = [];
    files.filter((file) => file.type === 'file').forEach((file) => {
      const parts = file.name.split('.');
      const extension = (parts.length > 1 ? parts.pop() : '').toLowerCase();
      if (!supportedExtensions.includes(extension)) return;

      const cleanName = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
      const isTask = /(^|\b)(tugas|laporan|makalah|praktikum|uts|uas|kuis|quiz|ujian)(\b|\d)/i.test(cleanName);
      const item = {
        judul: cleanName,
        mataKuliah: 'Dokumen perkuliahan',
        tanggal: '',
        deskripsi: `File ${extension.toUpperCase()} yang tersedia di folder assets.`,
        file: file.download_url || file.html_url,
        tipe: extension.toUpperCase(),
        status: 'Tersedia'
      };
      (isTask ? autoTugas : autoMateri).push(item);
    });

    // Data yang ditulis manual di content.js tetap dipertahankan; file baru dari assets ditambahkan otomatis.
    daftarMateri = [...daftarMateri, ...autoMateri];
    daftarTugas = [...daftarTugas, ...autoTugas];
  } catch (error) {
    console.error('Gagal membaca folder assets dari GitHub:', error);
    const note = document.createElement('p');
    note.className = 'text-muted';
    note.style.marginTop = '12px';
    note.textContent = 'Daftar berkas otomatis belum dapat dimuat. Coba muat ulang beberapa saat lagi.';
    document.getElementById('materiList').prepend(note);
  }
  refreshLists();
}

$('#materiSearch').addEventListener('input', refreshLists);
$('#tugasSearch').addEventListener('input', refreshLists);
$('#year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('dashboard-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-theme');
$('#themeToggle').innerHTML = `<span class="material-icons-sharp">${document.body.classList.contains('dark-theme') ? 'light_mode' : 'dark_mode'}</span>`;
$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
  $('#themeToggle').innerHTML = `<span class="material-icons-sharp">${isDark ? 'light_mode' : 'dark_mode'}</span>`;
});

$('#menuToggle').addEventListener('click', () => $('#sidebar').classList.toggle('sidebar-open'));
document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
  link.classList.add('active');
  $('#sidebar').classList.remove('sidebar-open');
}));

refreshLists();
loadFilesFromAssets();
