# Pertemuan6

Demo materi **Stack Navigation (push & pop)** pada aplikasi akademik sederhana. Berbeda dari Pertemuan7, proyek ini tidak memakai React Navigation; tumpukan layar dikelola manual dengan state di `App.js`.

## Menjalankan

```bash
npm install   # node_modules sudah tersedia
npx expo start
```

## Layar

| Layar | File | Fungsi |
| --- | --- | --- |
| Login | `screens/loginScreen.js` | Input username/password, tombol ke registrasi |
| Registrasi | `screens/registerScreen.js` | Form akun baru dengan konfirmasi password |
| Dashboard | `screens/dashboardScreen.js` | Profil ringkas, statistik, menu layanan, tombol detail |
| Detail Profil | `screens/detailScreen.js` | Rincian identitas dan data akademik |

## Cara Kerja Navigasi

State `stack` di `App.js` menyimpan daftar layar yang aktif. Layar teratas (`stack[stack.length - 1]`) yang dirender.

- `push(name, params)`: menambah layar baru ke atas tumpukan.
- `pop()`: menghapus layar teratas (kembali).
- `popToTop()`: menyisakan layar pertama (Login).
- `handleLogout()`: konfirmasi `Alert`, lalu `pop()`.

Alur utama: **Login → Dashboard → Detail Profil**, dengan **Login → Registrasi → Login** untuk pendaftaran.

## Akun Demo

| Username | Password | Role | Prodi |
| --- | --- | --- | --- |
| `taufiq` | `123` | Mahasiswa | D3 Manajemen Informatika |
| `admin` | `123` | Admin | Pusat Data & Sistem |

User baru hasil registrasi ditambahkan ke state `users` (hanya di memori) dengan semester `1`, IPK `0.00`, dan role `Mahasiswa`. Username yang sudah dipakai ditolak.

## Struktur

```
Pertemuan6/
├── App.js                  # State user, stack, auth, dan screen switcher
├── screens/
│   ├── loginScreen.js
│   ├── registerScreen.js
│   ├── dashboardScreen.js
│   └── detailScreen.js
├── app.json
└── package.json
```

## Catatan

- Dependensi sudah diselaraskan ke Expo SDK 57; `npx expo-doctor` melaporkan 21/21 pemeriksaan lulus dan export bundle Android berhasil.
- Data user hanya tersimpan di memori; registrasi hilang saat aplikasi dimuat ulang.
- Password disimpan dan dibandingkan dalam bentuk teks biasa karena ini demo navigasi, bukan modul keamanan.
- Tombol back bawaan Android tidak terhubung ke fungsi `pop()`, sehingga perilakunya bergantung pada default platform.

## Script

`npm start`, `npm run android`, `npm run ios`, `npm run web`.

[README utama](../README.md)
