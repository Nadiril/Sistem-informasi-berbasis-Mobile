# Projectsimple

Aplikasi kalkulator dengan tema gelap, dibuat dengan React Native + Expo.

## Menjalankan

```bash
npm install
npx expo start
```

## Struktur

- `App.js`: seluruh aplikasi, default export `Calculator`.
  - `Display`: menampilkan ekspresi dan hasil, tombol hapus `⌫`.
  - `Button` dan matriks tombol `KEYS` (`App.js` baris 6): `C ± % ÷`, angka, `× − +`, `. =`.
  - Header layar bertuliskan "Kalkulator" (`App.js` baris 128).
  - `useWindowDimensions` (`App.js` baris 64) mengubah tata letak saat mode landscape.
- `eslint.config.js`: konfigurasi ESLint memakai `eslint-config-expo/flat`.

## Cara Kerja Evaluasi

Ekspresi dipetakan dulu (`× ÷ −` → `* / -`), lalu dievaluasi dengan `Function("use strict"; return (...)`)()` di `App.js`. Fitur pendukung: `±` (ubah tanda), `%`, penggantian operator, pengaman titik desimal, dan pembulatan hasil hingga 1e10.

## Catatan

- `src/theme.js`, `src/utils/calculator.js`, dan `src/utils/layout.js` **tidak diimpor** oleh `App.js`. Isinya: parser tokenizer rekursif dengan kode error `INVALID`/`DIV_ZERO` dan batas `MAX_EXPRESSION_LENGTH = 32`, utilitas layout untuk layar kecil/landscape, serta definisi warna dan spacing. File-file ini adalah kode alternatif yang belum dipakai.
- `const styles = StyleSheet.create(...)` ditulis setelah komponen (`App.js` baris 146-174), bukan sebelumnya.

## Script

`npm start`, `npm run android`, `npm run ios`, `npm run web`, `npm run lint`.

[README utama](../README.md)
