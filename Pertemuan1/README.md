# Pertemuan1

Proyek pertemuan 1: starter Expo Router dengan TypeScript dan navigasi tab. Dasar ini menjadi acuan untuk materi routing berbasis file.

## Menjalankan

```bash
npm install
npx expo start
```

Lalu pindai QR dengan Expo Go, atau tekan `a` (Android), `i` (iOS), `w` (web).

## Struktur

```
src/
├── app/
│   ├── _layout.tsx      # ThemeProvider + splash screen + AppTabs
│   ├── index.tsx        # Tab Home (teks hero di baris 38)
│   └── explore.tsx      # Tab Explore (bagian yang bisa dilipat)
├── components/
│   ├── app-tabs.tsx     # NativeTabs: Home dan Explore
│   ├── hint-row.tsx, themed-text.tsx, themed-view.tsx, ...
│   └── ui/collapsible.tsx
├── constants/theme.ts
├── hooks/               # use-color-scheme, use-theme
└── global.css
```

Routing mengikuti `src/app/`: tiap file adalah satu layar, `_layout.tsx` mendefinisikan navigator.

## Konfigurasi

- `typedRoutes: true` dan `reactCompiler: true` di `app.json`.
- Path alias di `tsconfig.json`: `@/*` → `./src/*`, `@/* assets` → `./assets/*`.
- Tema light/dark aktif lewat `ThemeProvider`.

## Script

| Script | Fungsi |
| --- | --- |
| `npm start` | Dev server Expo |
| `npm run android` / `ios` / `web` | Jalankan di Android / iOS / browser |
| `npm run lint` | ESLint |
| `npm run reset-project` | Pindahkan kode awal ke `app-example` dan buat folder kosong |

## Catatan

- Teks hero di `src/app/index.tsx` baris 38 masih berupa frasa informal yang bisa diganti.
- Proyek ini memakai TypeScript, berbeda dari folder Pertemuan lain yang memakai JavaScript.

[README utama](../README.md)
