# Sistem Informasi Berbasis Mobile

Kumpulan tugas, latihan, dan proyek praktikum mata kuliah **Sistem Informasi Berbasis Mobile** di STIKOM PGRI Banyuwangi. Repo ini berisi sepuluh proyek Expo/React Native yang berjalan mandiri, masing-masing di folder sendiri.

## Daftar Isi

- [Teknologi](#teknologi)
- [Struktur Repo](#struktur-repo)
- [Cara Menjalankan](#cara-menjalankan)
- [Script](#script)
- [Isi Setiap Folder](#isi-setiap-folder)
- [Catatan dan Masalah yang Diketahui](#catatan-dan-masalah-yang-diketahui)
- [Lisensi](#lisensi)

## Teknologi

| Komponen | Versi / Keterangan |
| --- | --- |
| Expo SDK | ~57.0.x untuk Pertemuan1, Pertemuan3, Pertemuan4, Pertemuan5, Pertemuan7, Projectsimple, dan Projectsimple2; ~58.0.x untuk Projectsimple3 dan uts_sibm. Pertemuan6 mencampur `expo ^44.0.6` dengan paket ~57.0.x (lihat catatan) |
| React Native | 0.86.3 (SDK 57) dan 0.88.0 (SDK 58); Pertemuan6 mendeklarasikan `^0.72.17` |
| React | 19.2.3 (SDK 57) dan 19.3.0 (SDK 58) |
| TypeScript | ~6.0.3 (khusus Pertemuan1) |
| Navigasi | expo-router (Pertemuan1, Pertemuan7), React Navigation (Projectsimple3), stack manual (Pertemuan6) |
| UI | React Native Paper (Pertemuan5, Pertemuan6) |
| Penyimpanan lokal | AsyncStorage (Projectsimple3, Pertemuan7) dan expo-secure-store untuk sesi login (Pertemuan7) |

Sebagian besar demo memakai data hard-coded di dalam komponen. Projectsimple3 menyimpan catatan, sedangkan Pertemuan7 menyimpan akun dan produk, di perangkat. Tidak ada backend, API server, atau database daring. Login di Pertemuan6 dan Pertemuan7 hanya simulasi lokal.

## Struktur Repo

```
Sistem informasi berbasis Mobile/
├── Pertemuan1/       # Starter Expo Router + TypeScript, navigasi tab
├── Pertemuan3/       # Demo Props & State (JavaScript)
├── Pertemuan4/       # Demo styling Inline vs StyleSheet (JavaScript)
├── Pertemuan5/       # Demo komponen React Native Paper (JavaScript)
├── Pertemuan6/       # Demo Stack Navigation manual: login, registrasi, dashboard
├── Pertemuan7/       # Aplikasi manajemen produk "Toko Anda" (expo-router)
├── Projectsimple/    # Aplikasi kalkulator (JavaScript)
├── Projectsimple2/   # Aplikasi kasir "Berkah Jaya" (JavaScript)
├── Projectsimple3/   # Aplikasi catatan (Notes App) + AsyncStorage
└── uts_sibm/         # Scaffold UTS, masih template blank
```

Tiap folder adalah proyek Expo mandiri dengan `package.json` dan `package-lock.json` sendiri, tanpa workspace atau monorepo tooling di root.

Dokumentasi per folder: [Pertemuan1](Pertemuan1/README.md) | [Pertemuan3](Pertemuan3/README.md) | [Pertemuan4](Pertemuan4/README.md) | [Pertemuan5](Pertemuan5/README.md) | [Pertemuan6](Pertemuan6/README.md) | [Pertemuan7](Pertemuan7/README.md) | [Projectsimple](Projectsimple/README.md) | [Projectsimple2](Projectsimple2/README.md) | [Projectsimple3](Projectsimple3/README.md) | [uts_sibm](uts_sibm/README.md)

## Cara Menjalankan

Pilih folder yang ingin dijalankan, lalu:

```bash
cd Pertemuan7
npm install
npx expo start
```

Setelah dev server berjalan:

- Pindai kode QR dengan aplikasi **Expo Go** di HP, atau
- Tekan `a` untuk emulator Android, `i` untuk iOS simulator, `w` untuk browser.

Folder **Pertemuan5**, **Pertemuan6**, **Pertemuan7**, **Projectsimple3**, dan **uts_sibm** sudah memiliki `node_modules`. Folder lain masih perlu `npm install` sebelum dijalankan.

> **Pertemuan6:** `package.json` memakai `expo ^44.0.6` dan `react-native ^0.72.17` bersama React 19.2.3. Kombinasi ini tidak kompatibel; selaraskan versi dependensi sebelum menjalankan aplikasi (lihat [catatan](#catatan-dan-masalah-yang-diketahui)).

## Script

| Script | Fungsi | Folder |
| --- | --- | --- |
| `npm start` | Jalankan Expo dev server | Semua folder |
| `npm run android` | Jalankan di emulator/perangkat Android | Semua folder |
| `npm run ios` | Jalankan di simulator iOS | Semua folder |
| `npm run web` | Jalankan di browser | Semua folder |
| `npm run lint` | ESLint | Pertemuan1, Pertemuan7, Projectsimple, Projectsimple3 |
| `npm run check` | Diagnosa dependensi dengan `expo-doctor` | Pertemuan7 |
| `npm run reset-project` | Reset ke template awal | Pertemuan1 |

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

Demo materi **Styling: Inline vs StyleSheet** dalam satu file `App.js`, judul layar "Sistem Akademik Mahasiswa". Data hard-coded: profil M. Nadiril Khoir (NPM `1125102212`, D3 Manajemen Informatika, IPK 4.00) dan empat mata kuliah (termasuk Sistem Informasi Berbasis Mobile, kode `KK312408`).

- Bagian pertama: kartu profil dibuat sepenuhnya dengan inline style.
- Bagian kedua: tabel Kartu Hasil Studi (KHS) yang bisa digeser horizontal, dibuat dengan `StyleSheet.create`, lengkap dengan baris selang-seling dan total SKS.
- Tabel ketiga ditujukan untuk FRS, tetapi masih memakai data dan judul KHS (lihat catatan).

### Pertemuan5

Demo komponen **React Native Paper** pada layar "Sistem Akademik Mahasiswa" dalam satu file `App.js`:

- Kartu profil mahasiswa: avatar, ringkasan semester/IPK/status/gender, kontak, dan chip peminatan.
- Form input profil: `TextInput`, `RadioButton`, `SegmentedButtons`, `Checkbox`, `Switch`, dan tombol simpan/reset. Data yang disimpan langsung memperbarui kartu profil dan memunculkan `Snackbar`.
- Tabel KHS memakai `DataTable` di dalam `ScrollView` horizontal.
- Foto profil diambil dari `assets/Profile.jpeg`.

### Pertemuan6

Demo materi **Stack Navigation (push & pop)** tanpa library navigasi. Tumpukan layar dikelola manual dengan state di `App.js`:

- Layar Login, Registrasi, Dashboard, dan Detail Profil di folder `screens/`.
- Operasi `push`, `pop`, dan `popToTop` mensimulasikan perilaku stack LIFO.
- Login memakai daftar user di memori; tersedia akun demo `taufiq` / `123` dan `admin` / `123`.
- Registrasi menambah user baru ke state, lalu kembali ke layar Login.
- UI memakai React Native Paper dan feedback `Snackbar`.

### Pertemuan7

Aplikasi manajemen produk toko **"Toko Anda"** dengan Expo Router, Context, dan penyimpanan lokal:

- Login dengan email atau nama toko. Identitas yang belum terdaftar otomatis dibuatkan akun baru (mode demo luring).
- Lima tab: **Home** (statistik dan produk terbaru), **Pencarian** (kata kunci, status, kategori), **Plus** (tambah produk), **Unggulan**, dan **Profil**.
- Produk disimpan per akun di AsyncStorage; akun baru mendapat beberapa produk contoh.
- Kata sandi disimpan sebagai hash SHA-256 dengan salt, sesi login di `expo-secure-store` selama 30 hari.
- Validasi form, status loading/error, dan empty state tersedia di layar daftar.

### Projectsimple

Kalkulator dengan tema gelap, terdiri dari:

- `App.js`: komponen `Display` dan `Button`, matriks tombol (`C ± % ÷`, angka, `× − +`, `. =`), mode landscape lewat `useWindowDimensions`.
- Evaluasi ekspresi memakai `Function()` dengan pemetaan simbol `× ÷ −` ke operator JavaScript, penanganan `±`, `%`, dan pembulatan hasil.

### Projectsimple2

Aplikasi kasir (POS) dengan nama toko **Berkah Jaya** dalam satu file `App.js`:

- Enam produk hard-coded dengan harga Rupiah (Kopi, Nasi Goreng, Mie Goreng, Es Teh, Roti, Jus Jeruk).
- Grid produk dua kolom, keranjang belanja dengan tombol tambah/kurang jumlah, dan perhitungan total otomatis.
- Tombol **Bayar** memunculkan `Alert.alert` lalu mengosongkan keranjang.

### Projectsimple3

Aplikasi catatan (**Notes App**) yang mengimplementasikan `PRD.md` di folder yang sama:

- Tiga tab: **Catatan**, **Favorit**, dan **Pengaturan**, dengan editor catatan sebagai modal.
- CRUD catatan, pencarian judul/isi, penanda favorit, dan hapus semua catatan dengan konfirmasi.
- Data disimpan di AsyncStorage dengan key `@notes_app/notes`; catatan lama dinormalisasi agar tetap kompatibel.
- Tema Material 3-inspired, layout grid dua kolom, loading/empty state, dan penanganan kegagalan penyimpanan.
- Memakai Expo SDK 58 dan React Navigation (native stack + bottom tabs).

### uts_sibm

Scaffold proyek UTS dari template blank Expo SDK 58. Saat ini `App.js` masih berisi layar bawaan "Open up App.js to start working on your app!" dan `PRD.md` masih kosong, jadi belum ada fitur yang diimplementasikan.

## Catatan dan Masalah yang Diketahui

- **Pertemuan6 — dependensi tidak selaras.** `expo ^44.0.6` dan `react-native ^0.72.17` dipasang bersama React 19.2.3 dan `expo-status-bar ~57.0.1`. Versi ini tidak kompatibel satu sama lain sehingga aplikasi berisiko gagal dijalankan. Selaraskan seluruh paket ke satu SDK Expo (misalnya dengan membuat ulang proyek dari template SDK terbaru lalu memindahkan kode `App.js` dan `screens/`).
- **Pertemuan4 — kartu FRS belum selesai.** Kartu ketiga masih berjudul KHS dan memakai `mataKuliah`, bukan `mataKuliahFrs`. Footer juga menulis total 13 SKS padahal empat mata kuliah × 3 SKS = 12 SKS.
- **Pertemuan5 — total SKS dan validasi.** Footer KHS menulis 13 SKS padahal datanya berjumlah 12 SKS. `HelperText` validasi NPM/email memakai `visible={false}`, sehingga pesan validasi tidak pernah tampil. Switch "Status Mahasiswa Aktif" bernilai awal `false`; menekan Simpan tanpa mengubah switch akan mengubah status profil menjadi "Cuti".
- **Projectsimple2 — keranjang terpotong.** Daftar pesanan hanya merender `cart.slice(0, 2)`, sehingga item ketiga dan seterusnya tidak terlihat meskipun tetap dihitung dalam total.
- **Projectsimple — modul alternatif tidak dipakai.** `src/theme.js`, `src/utils/calculator.js`, dan `src/utils/layout.js` tidak diimpor oleh `App.js`.
- **Projectsimple3 — PRD dan implementasi berbeda versi.** `PRD.md` menargetkan Expo SDK 57, sedangkan proyek yang berjalan memakai SDK 58.
- **Pertemuan1 — teks contoh.** Teks hero di `src/app/index.tsx` masih berupa frasa informal yang bisa diganti.
- **uts_sibm — belum diisi.** `PRD.md` kosong dan `App.js` masih template default.

## Lisensi

MIT. File `LICENSE` tersedia di tiap folder proyek.
