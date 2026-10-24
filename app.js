const $ = (selector) => document.querySelector(selector);

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function formatDate(value) {
  if (!value) return 'Tanggal belum diisi';
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
    container.innerHTML = `<article class="empty-state"><div class="empty-icon"><span class="material-icons-sharp">${kind === 'materi' ? 'menu_book' : 'assignment'}</span></div><h3>Belum ada ${kind === 'materi' ? 'materi kuliah' : 'tugas kuliah'}</h3><p>Publikasi yang ditambahkan melalui file <code>content.js</code> akan muncul di bagian ini.</p></article>`;
    return;
  }

  container.innerHTML = filtered.map((item) => {
    const file = item.file ? escapeHTML(item.file) : '';
    const type = escapeHTML(item.tipe || 'Dokumen');
    const status = kind === 'tugas' && item.status ? `<span class="post-status">${escapeHTML(item.status)}</span>` : '';
    const fileButton = file
      ? `<a class="post-link" href="${file}" target="_blank" rel="noopener"><span class="material-icons-sharp">download</span> Buka berkas <span class="material-icons-sharp arrow">arrow_outward</span></a>`
      : `<span class="post-link disabled-link"><span class="material-icons-sharp">info</span> Berkas belum ditambahkan</span>`;
    return `<article class="post-card"><div class="post-card-top"><div class="file-icon ${kind === 'tugas' ? 'file-orange' : ''}"><span class="material-icons-sharp">${kind === 'materi' ? 'description' : 'task'}</span></div><span class="file-type">${type}</span></div><div class="post-meta"><span class="material-icons-sharp">calendar_month</span>${formatDate(item.tanggal)}</div><h3>${escapeHTML(item.judul || 'Tanpa judul')}</h3><div class="subject-name">${escapeHTML(item.mataKuliah || 'Mata kuliah belum diisi')}</div><p class="post-description">${escapeHTML(item.deskripsi || 'Belum ada deskripsi.')}</p><div class="post-card-bottom">${fileButton}${status}</div></article>`;
  }).join('');
}

function refreshLists() {
  const materi = Array.isArray(materiKuliah) ? materiKuliah : [];
  const tugas = Array.isArray(tugasKuliah) ? tugasKuliah : [];
  $('#materiCount').textContent = materi.length;
  $('#tugasCount').textContent = tugas.length;
  renderPosts(materi, 'materiList', $('#materiSearch').value, 'materi');
  renderPosts(tugas, 'tugasList', $('#tugasSearch').value, 'tugas');
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
