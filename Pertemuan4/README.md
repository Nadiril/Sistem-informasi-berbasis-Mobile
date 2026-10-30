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
- `mataKuliahFrs` (4 baris) dipakai oleh tabel Kartu Rencana Studi (FRS).

## Tiga Bagian, Dua Pendekatan Styling

1. **Inline style**: kartu profil ditulis langsung sebagai objek style di dalam JSX (avatar, baris semester/IPK/status).
2. **`StyleSheet.create` (KHS)**: tabel Kartu Hasil Studi yang bisa digeser horizontal, dengan kolom Mata Kuliah / SKS / Nilai / Semester, baris selang-seling, dan footer total SKS.
3. **`StyleSheet.create` (FRS)**: tabel Kartu Rencana Studi memakai data `mataKuliahFrs`, judul serta header hijau (`frsTitle`, `frsTableHeader`), dan footer total SKS sendiri.

Total SKS pada kedua tabel dihitung dari data dengan `reduce`, bukan angka tetap.

## Catatan

- Seluruh data akademik masih hard-coded di `App.js`.
- Profil memakai NPM `1125102212`, berbeda dari data mahasiswa di Pertemuan3 (`3125101308`).

[README utama](../README.md)
