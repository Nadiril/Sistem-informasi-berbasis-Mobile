# uts_sibm

Folder untuk proyek **Ujian Tengah Semester (UTS)** mata kuliah Sistem Informasi Berbasis Mobile.

Saat ini folder ini masih berupa scaffold dari template **blank** Expo SDK 58:

- `App.js` masih berisi layar bawaan `create-expo-app` ("Open up App.js to start working on your app!").
- `PRD.md` masih kosong.
- Belum ada navigasi, penyimpanan, atau fitur aplikasi.

## Menjalankan

```bash
npm install   # node_modules sudah tersedia
npx expo start
```

Lalu pindai QR dengan Expo Go, atau tekan `a` (Android), `i` (iOS), `w` (web).

## Teknologi

| Komponen | Versi |
| --- | --- |
| Expo SDK | ~58.0.21 |
| React Native | 0.88.0 |
| React | 19.3.0 |
| Entry point | `index.js` → `registerRootComponent(App)` |

## Struktur

```
uts_sibm/
├── App.js        # Masih template default
├── PRD.md        # Belum diisi
├── index.js
├── app.json
├── assets/
└── package.json
```

## Langkah Berikutnya

1. Isi `PRD.md` dengan kebutuhan produk dan rancangan teknis.
2. Ganti `App.js` dengan implementasi aplikasi.
3. Tambahkan dependensi memakai `npx expo install` agar versinya sesuai SDK 58.
4. Jalankan `npx expo lint` / `npx expo-doctor` sebelum mengevaluasi hasil.

[README utama](../README.md)
