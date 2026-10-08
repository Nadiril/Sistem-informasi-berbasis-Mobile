# Pertemuan4

Demo materi **Styling: Inline vs StyleSheet** dalam satu file `App.js` (sekitar 349 baris). Layar berjudul "Sistem Akademik Mahasiswa" berisi data akademik hard-coded.

## Menjalankan

```bash
npm install
npx expo start
```

## Data Hard-Coded

- Profil mahasiswa: M N Jamal Thaariq, NPM `1125102212`, S1 Teknik Informatika, semester 3, IPK 3.85, status Aktif.
- `mataKuliah` (4 baris, `App.js` baris 13-20): Sistem Informasi Berbasis Mobile (`KK312408`), Sistem Basis Data, Desain UI/UX, Sistem Informasi Berbasis Web.
- `mataKuliahFrs` (`App.js` baris 25-30), dideklarasikan tetapi belum dipakai.

## Dua Pendekatan Styling

1. **Inline style**: kartu profil ditulis langsung sebagai objek style di dalam JSX (avatar, baris semester/IPK/status).
2. **`StyleSheet.create`**: tabel Kartu Hasil Studi (KHS) yang bisa digeser horizontal, dengan kolom Mata Kuliah / SKS / Nilai / Semester, baris selang-seling, dan footer total SKS (13 SKS).

## Catatan

- **Kartu FRS belum selesai**: kartu kedua (`App.js` baris 184-228) masih memakai data `mataKuliah` dan judul yang sama dengan kartu KHS, bukan `mataKuliahFrs`. Ini pekerjaan yang belum tuntas.

[README utama](../README.md)
