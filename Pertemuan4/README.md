# Pertemuan4

Demo materi **Styling: Inline vs StyleSheet** dalam satu file `App.js` (sekitar 349 baris). Layar berjudul "Sistem Akademik Mahasiswa" berisi data akademik hard-coded.

## Menjalankan

```bash
npm install
npx expo start
```

## Data Hard-Coded

- Profil mahasiswa: M. Nadiril Khoir, NPM `1125102212`, D3 Manajemen Informatika, semester 3, IPK 4.00, status Aktif, foto `assets/icon.png`.
- `mataKuliah` (4 baris, `App.js` baris 17-22): Sistem Informasi Berbasis Mobile (`KK312408`), Sistem Basis Data, Desain UI/UX, Sistem Informasi Berbasis Web.
- `mataKuliahFrs` (`App.js` baris 25-30), dideklarasikan tetapi belum dipakai.

## Dua Pendekatan Styling

1. **Inline style**: kartu profil ditulis langsung sebagai objek style di dalam JSX (avatar, baris semester/IPK/status).
2. **`StyleSheet.create`**: tabel Kartu Hasil Studi (KHS) yang bisa digeser horizontal, dengan kolom Mata Kuliah / SKS / Nilai / Semester, baris selang-seling, dan footer total SKS.

## Catatan

- **Kartu FRS belum selesai**: kartu ketiga (`App.js` baris 184-228) masih berjudul KHS, memakai data `mataKuliah` (bukan `mataKuliahFrs`), dan kolom Nilai dikomentari. Ini pekerjaan yang belum tuntas.
- Footer kedua tabel menulis **13 SKS**, padahal empat mata kuliah × 3 SKS = **12 SKS**.
- Profil memakai NPM `1125102212`, berbeda dari data mahasiswa di Pertemuan3 (`3125101308`).

[README utama](../README.md)
