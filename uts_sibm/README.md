# uts_sibm

Folder untuk proyek **Ujian Tengah Semester (UTS)** mata kuliah Sistem Informasi Berbasis Mobile.

Aplikasi **Expense Tracker**: pencatatan keuangan pribadi yang berjalan penuh di perangkat
tanpa backend. Radaan kebutuhan ada di `PRD.md`, sistem desain (Material You + palet Desert)
ada di `DESIGN.md`.

## Menjalankan

```bash
npm install   # node_modules sudah tersedia
npx expo start
```

Lalu pindai QR dengan Expo Go, atau tekan `a` (Android), `i` (iOS), `w` (web).

> Bila `npx expo` tertarik ke `expo-cli` global (lawas), jalankan CLI lokal langsung:
> `node node_modules/expo/bin/cli start`

## Pemeriksaan

```bash
npx eslint src        # lint
npx expo-doctor       # dependensi & konfigurasi (20 pemeriksaan)
node node_modules/expo/bin/cli export --platform android   # bundel produksi
```

## Teknologi

| Komponen | Versi |
| --- | --- |
| Expo SDK | 58.0.21 |
| React Native | 0.88.1 |
| React | 19.3.0 |
| Navigasi | Expo Router (`Tabs` + `Drawer`) |
| Penyimpanan | `@react-native-async-storage/async-storage` |
| State | React Context API + `useReducer` |
| Grafik | `react-native-chart-kit` |
| Entry point | `expo-router/entry` (lihat `package.json`) |

## Struktur

```
uts_sibm/
├── app.json                  # konfigurasi Expo, plugin expo-router
├── src/
│   ├── app/                  # route Expo Router (setiap file = 1 layar)
│   │   ├── _layout.js        # provider, font Roboto, Stack, layar error startup
│   │   ├── login.js          # masuk
│   │   ├── register.js       # daftar
│   │   ├── transaction/      # tambah, detail, ubah transaksi
│   │   └── (app)/
│   │       ├── _layout.js    # guard autentikasi + Drawer
│   │       ├── profile.js    # profil pengguna
│   │       ├── settings.js   # pengaturan
│   │       ├── about.js      # informasi aplikasi
│   │       └── (tabs)/       # bottom navigation
│   │           ├── index.js          # Dashboard
│   │           ├── transactions.js   # daftar + filter
│   │           ├── reports.js        # laporan per periode
│   │           └── categories.js     # kelola kategori
│   ├── components/           # komponen UI bersama
│   ├── constants/            # kategori bawaan, ikon, periode laporan
│   ├── context/              # AppProvider (state + AsyncStorage), FeedbackProvider
│   ├── services/             # authService (hash password), storage
│   ├── theme/                # token warna, tipografi, spacing, bayangan
│   └── utils/                # currency, date, report, validation, id
├── PRD.md
├── DESIGN.md
└── package.json
```

## Data

Disimpan lokal lewat AsyncStorage dengan kunci `users`, `currentUser`, `transactions`,
dan `categories`. Data dipisah per `userId`, jadi akun yang berbeda tidak tercampur.

[README utama](../README.md)
