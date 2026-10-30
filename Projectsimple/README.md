# Projectsimple

Aplikasi kalkulator dengan tema gelap, dibuat dengan React Native + Expo.

## Menjalankan

```bash
npm install
npx expo start
```

## Struktur

- `App.js`: seluruh aplikasi, default export `Calculator`, memakai tema, parser, dan layout dari folder `src`.
  - `Display`: menampilkan ekspresi dan hasil, tombol hapus `⌫`; ukuran font mengikuti `computeLayout`.
  - `Button` dan matriks tombol `KEYS`: `C ± % ÷`, angka, `× − +`, `. =`.
  - Header layar bertuliskan "Kalkulator".
  - `useWindowDimensions` mengubah tata letak saat mode landscape.
- `src/theme.js`: token warna, spacing, radius, dan elevation.
- `src/utils/calculator.js`: tokenizer dan parser ekspresi.
- `src/utils/layout.js`: `computeLayout` untuk ukuran font, padding, dan tinggi keypad.
- `eslint.config.js`: konfigurasi ESLint memakai `eslint-config-expo/flat`.

## Cara Kerja Evaluasi

Ekspresi dievaluasi oleh parser di `src/utils/calculator.js` (tokenizer + recursive descent), tanpa `eval` atau `Function`. Parser mendukung operator ASCII, persen, dan kode error `INVALID`/`DIV_ZERO`; `App.js` memetakan simbol `−` ke `-`, lalu memformat hasil dengan `formatNumber`. Fitur pendukung: `±` (ubah tanda), `%`, penggantian operator, dan pengaman titik desimal.

## Catatan

- `const styles = StyleSheet.create(...)` ditulis setelah komponen, bukan sebelumnya.

## Script

`npm start`, `npm run android`, `npm run ios`, `npm run web`, `npm run lint`.

[README utama](../README.md)
