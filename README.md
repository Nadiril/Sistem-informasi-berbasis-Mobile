# Sistem Informasi Berbasis Mobile

Kumpulan tugas dan proyek praktikum mata kuliah **Sistem Informasi Berbasis Mobile** di STIKOM PGRI Banyuwangi. Repo ini berisi lima proyek Expo/React Native yang berjalan mandiri, masing-masing di folder sendiri.

## Daftar Isi

- [Teknologi](#teknologi)
- [Struktur Repo](#struktur-repo)
- [Cara Menjalankan](#cara-menjalankan)
- [Isi Setiap Folder](#isi-setiap-folder)
- [Catatan dan Masalah yang Diketahui](#catatan-dan-masalah-yang-diketahui)
- [Lisensi](#lisensi)

## Teknologi

| Komponen | Versi |
| --- | --- |
| Expo SDK | ~57.0.x |
| React Native | 0.86.3 |
| React | 19.2.3 |
| TypeScript | ~6.0.3 (khusus Pertemuan1) |
| Navigasi | expo-router (khusus Pertemuan1) |

Semua data di dalam aplikasi bersifat hard-coded di dalam komponen. Tidak ada backend, API, database, atau sistem login di repo ini.

## Struktur Repo

```
Sistem informasi berbasis Mobile/
├── Pertemuan1/       # Starter Expo Router + TypeScript, navigasi tab
├── Pertemuan3/       # Demo Props & State (JavaScript)
├── Pertemuan4/       # Demo styling Inline vs StyleSheet (JavaScript)
├── Projectsimple/    # Aplikasi kalkulator (JavaScript)
└── Projectsimple2/   # Aplikasi kasir "Berkah Jaya" (JavaScript)
```

Tiap folder adalah proyek Expo mandiri dengan `package.json` dan `package-lock.json` sendiri, tanpa workspace atau monorepo tooling di root.

Dokumentasi per folder: [Pertemuan1](Pertemuan1/README.md) | [Pertemuan3](Pertemuan3/README.md) | [Pertemuan4](Pertemuan4/README.md) | [Projectsimple](Projectsimple/README.md) | [Projectsimple2](Projectsimple2/README.md)

## Cara Menjalankan

Pilih folder yang ingin dijalankan, lalu:

```bash
cd Pertemuan3
npm install
npx expo start
```

Setelah dev server berjalan:

- Pindai kode QR dengan aplikasi **Expo Go** di HP, atau
- Tekan `a` untuk emulator Android, `i` untuk iOS simulator, `w` untuk browser.

> `Pertemuan3` sudah memiliki `node_modules`. Folder lain masih perlu `npm install` sebelum dijalankan.

Script yang tersedia di tiap folder:

| Script | Fungsi |
| --- | --- |
| `npm start` | Jalankan Expo dev server |
| `npm run android` | Jalankan di emulator/perangkat Android |
| `npm run ios` | Jalankan di simulator iOS |
| `npm run web` | Jalankan di browser |
| `npm run lint` | ESLint (khusus Pertemuan1 dan Projectsimple) |
| `npm run reset-project` | Reset ke template awal (khusus Pertemuan1) |

## Isi Setiap Folder

### Pertemuan1

Starter dari `create-expo-app` dengan Expo Router dan TypeScript. Struktur file-based routing ada di `src/app/`:

- `index.tsx`: layar Home dengan judul teks yang sudah diubah dan beberapa baris petunjuk.
- `explore.tsx`: layar Explore berisi bagian-bagian yang bisa dilipat, membahas routing, gambar, tema light/dark, dan animasi.
- `src/components/app-tabs.tsx`: tab native **Home** dan **Explore** via `NativeTabs`.

Konfigurasi tambahan: `typedRoutes` dan `reactCompiler` aktif, path alias `@/*` menunjuk ke `./src/*`.

### Pertemuan3

Demo materi **Props & State** dalam satu file `App.js`:

- Komponen anak `KartuMahasiswa({ nama, nim, prodi })` merender kartu data akademik, dipanggil dua kali dengan data berbeda (mendemonstrasikan props).
- Komponen induk memakai `useState` untuk counter dan toggle status akun (Aktif/Offline).
- Header: "Pertemuan 3: Props & State" / "STIKOM PGRI Banyuwangi".

### Pertemuan4

Demo materi **Styling: Inline vs StyleSheet** dalam satu file `App.js`, judul layar "Sistem Akademik Mahasiswa". Data hard-coded: profil mahasiswa, empat mata kuliah (termasuk Sistem Informasi Berbasis Mobile, kode `KK312408`), dan daftar rencana studi.

- Bagian pertama: kartu profil dibuat sepenuhnya dengan inline style.
- Bagian kedua: tabel Kartu Hasil Studi (KHS) yang bisa digeser horizontal, dibuat dengan `StyleSheet.create`, lengkap dengan baris selang-seling dan total SKS.

### Projectsimple

Kalkulator dengan tema gelap, terdiri dari:

- `App.js`: komponen `Display` dan `Button`, matriks tombol (`C ± % ÷`, angka, `× − +`, `. =`), mode landscape lewat `useWindowDimensions`.
- Evaluasi ekspresi memakai `Function()` dengan pemetaan simbol `× ÷ −` ke operator JavaScript, penanganan `±`, `%`, dan pembulatan hasil.

### Projectsimple2

Aplikasi kasir (POS) dengan nama toko **Berkah Jaya** dalam satu file `App.js`:

- Enam produk hard-coded dengan harga Rupiah (Kopi, Nasi Goreng, Mie Goreng, Es Teh, Roti, Jus Jeruk).
- Grid produk dua kolom, keranjang belanja dengan tombol tambah/kurang jumlah, dan perhitungan total otomatis.
- Tombol **Bayar** memunculkan `Alert.alert` lalu mengosongkan keranjang.

## Lisensi

MIT. File `LICENSE` tersedia di tiap folder proyek.
