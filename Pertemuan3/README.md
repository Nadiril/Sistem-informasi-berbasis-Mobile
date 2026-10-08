# Pertemuan3

Demo materi **Props & State** dalam satu file `App.js` (sekitar 187 baris). Semua konten dirender di dalam satu `ScrollView`.

## Menjalankan

```bash
npm install   # node_modules sudah tersedia, cukup dijalankan bila belum ada
npx expo start
```

## Materi yang Didemonstrasikan

### Props

Komponen anak `KartuMahasiswa({ nama, nim, prodi })` di `App.js` baris 12 merender kartu "Data Akademik Mahasiswa". Kartu dipanggil dua kali dengan data berbeda:

| nama | nim | prodi |
| --- | --- | --- |
| M. Nadiril Khoir | 3125101308 | D3 Manajemen Informatika |
| Ahmad Rojali | 362024002 | D3 Manajemen Informatika |

### State

Komponen induk `App` memakai dua `useState` (`App.js` baris 25-26):

- `counter`: tombol `+` dan `−` menaikkan/menurunkan angka.
- `statusAktif`: toggle status akun, menampilkan "AKTIF (Online)" atau "TIDAK AKTIF (Offline)".

## Header

"Pertemuan 3: Props & State" dengan subjudul "STIKOM PGRI Banyuwangi" (`App.js` baris 43).

[README utama](../README.md)
