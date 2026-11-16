# Design System — Expense Tracker

## 1. Project Overview

**Nama Project:** Expense Tracker  
**Platform:** Android / iOS  
**Framework:** React Native + Expo  
**Bahasa:** JavaScript  
**Design Concept:** Material You (Material 3)  
**Color Palette:** Desert  
**Design Approach:** Modern, Minimal, Warm, Clean, dan User Friendly.

Dokumen ini menjadi panduan desain visual dan pengalaman pengguna untuk aplikasi Expense Tracker. Seluruh implementasi antarmuka harus mengikuti sistem desain yang telah ditentukan di dokumen ini.

---

## 2. Design Philosophy

Aplikasi menggunakan pendekatan **Material You (Material Design 3)** yang mengutamakan konsistensi, fleksibilitas, aksesibilitas, dan pengalaman penggunaan yang intuitif.

### Prinsip desain

1. **Material 3 Foundation**  
   Menggunakan komponen dan pola desain Material 3 sebagai dasar antarmuka.

2. **Simple & Functional**  
   Menampilkan informasi keuangan secara ringkas dan mudah dipahami.

3. **Visual Hierarchy**  
   Memprioritaskan informasi penting seperti saldo, pemasukan, dan pengeluaran.

4. **Rounded Components**  
   Menggunakan sudut membulat pada card, button, input, dan komponen lainnya.

5. **Consistent Color System**  
   Menggunakan palet Desert sebagai warna utama dan warna pendukung.

6. **Responsive Layout**  
   Antarmuka harus menyesuaikan ukuran layar perangkat mobile.

---

## 3. Color System

### 3.1 Primary Color — Desert

Palet warna utama diambil dari gambar referensi UI Colors dengan nama **Desert**.

| Token | HEX | Penggunaan |
|---|---|---|
| Primary 50 | `#FCF7EA` | Background lembut |
| Primary 100 | `#F8EBC9` | Surface lembut |
| Primary 200 | `#F1D597` | Highlight |
| Primary 300 | `#E9B75B` | Secondary surface |
| Primary 400 | `#E19B2E` | Accent |
| Primary 500 | `#D18521` | Primary variant |
| Primary 600 | `#AA5F18` | Primary utama |
| Primary 700 | `#904818` | Primary pressed |
| Primary 800 | `#783B1B` | Dark accent |
| Primary 900 | `#67311C` | Deep accent |
| Primary 950 | `#3B180D` | Kontras sangat gelap |

**Warna utama aplikasi:** `#AA5F18`

### 3.2 Semantic Colors

Warna semantik digunakan untuk membedakan status dan jenis informasi keuangan.

| Semantic | HEX | Penggunaan |
|---|---|---|
| Income | `#2E7D32` | Pemasukan |
| Expense | `#C62828` | Pengeluaran |
| Warning | `#ED9B24` | Peringatan |
| Info | `#1976D2` | Informasi |
| Success | `#388E3C` | Berhasil |
| Error | `#D32F2F` | Kesalahan |

Warna pemasukan dan pengeluaran merupakan warna semantik tersendiri. Jangan menggantinya dengan warna primary.

### 3.3 Neutral Colors

| Token | HEX | Penggunaan |
|---|---|---|
| Background | `#FFFBF5` | Background utama |
| Surface | `#FFFFFF` | Card dan container |
| Surface Variant | `#F5EFE5` | Area sekunder |
| Outline | `#82776B` | Border |
| Text Primary | `#241A12` | Teks utama |
| Text Secondary | `#71665C` | Teks pendukung |
| Disabled | `#BDB5AA` | Komponen nonaktif |

### 3.4 Color Usage Rules

- Gunakan Primary 600 sebagai warna identitas utama.
- Gunakan Primary 50 dan 100 untuk background atau surface yang lembut.
- Gunakan Primary 700–950 untuk teks atau elemen gelap yang membutuhkan kontras.
- Gunakan warna Income untuk pemasukan.
- Gunakan warna Expense untuk pengeluaran.
- Hindari penggunaan terlalu banyak warna dalam satu halaman.
- Pastikan teks memiliki kontras yang cukup terhadap background.

---

## 4. Typography

Mengikuti pendekatan tipografi Material 3 dengan hierarki teks yang konsisten.

**Font utama:** Roboto.

| Typography | Penggunaan |
|---|---|
| Display | Angka saldo utama |
| Headline | Judul halaman |
| Title | Judul card dan section |
| Body | Informasi dan deskripsi |
| Label | Button, tab, dan label input |

### Typography Rules

- Angka saldo harus mudah terlihat.
- Gunakan font weight Medium atau SemiBold untuk informasi penting.
- Gunakan Regular untuk deskripsi dan teks pendukung.
- Hindari terlalu banyak variasi ukuran font.
- Format nominal menggunakan format Rupiah Indonesia, misalnya `Rp 1.500.000`.

---

## 5. Shape & Component Style

Material 3 menggunakan bentuk komponen yang lembut dan konsisten.

| Component | Style |
|---|---|
| Card | Rounded corner 16–24 dp |
| Button | Rounded atau pill shape |
| Text Input | Rounded corner 12–16 dp |
| Dialog | Rounded corner 24 dp |
| Bottom Navigation | Material 3 Navigation Bar |
| Modal / Bottom Sheet | Rounded top corner |
| Icon | Material Symbols / Material Icons |

### Component Rules

- Gunakan elevation secara seperlunya.
- Hindari shadow yang terlalu tebal.
- Gunakan padding yang konsisten.
- Pastikan ukuran tombol nyaman disentuh.
- Gunakan ikon yang konsisten, utamakan Material Symbols.

---

## 6. Navigation Structure

Navigasi utama menggunakan kombinasi **Bottom Navigation** dan **Drawer Navigation**.

### 6.1 Bottom Navigation

Menu utama:

1. **Dashboard** — Ringkasan keuangan.
2. **Transaksi** — Daftar pemasukan dan pengeluaran.
3. **Laporan** — Ringkasan dan grafik keuangan.
4. **Kategori** — Pengelolaan kategori transaksi.

Bottom Navigation harus menggunakan pola Material 3 Navigation Bar.

### 6.2 Drawer Navigation

Drawer digunakan untuk menu tambahan:

- Profil pengguna
- Pengaturan
- Informasi aplikasi
- Logout

Drawer tidak boleh menggantikan akses cepat ke menu utama.

---

## 7. Screen Design Guidelines

Bagian ini menjelaskan panduan visual untuk setiap halaman aplikasi.

### 7.1 Login Screen

Tujuan: memberikan akses pengguna ke aplikasi.

Komponen:
- Nama dan identitas aplikasi.
- Input email atau username sesuai kebutuhan autentikasi.
- Input password.
- Tombol Login.
- Navigasi menuju halaman registrasi jika tersedia.
- Pesan validasi dan error.

Panduan:
- Layout sederhana dan fokus pada proses login.
- Gunakan warna Primary untuk tombol utama.
- Gunakan komponen input bergaya Material 3.

### 7.2 Dashboard Screen

Tujuan: menampilkan kondisi keuangan pengguna secara ringkas.

Komponen:
- Greeting atau sapaan pengguna.
- Ringkasan saldo total.
- Card pemasukan.
- Card pengeluaran.
- Grafik sederhana.
- Daftar transaksi terbaru.
- Tombol untuk menambahkan transaksi.

Panduan:
- Saldo menjadi informasi paling menonjol.
- Pemasukan dan pengeluaran harus mudah dibedakan.
- Gunakan card untuk mengelompokkan informasi.
- Batasi informasi agar dashboard tidak terlalu padat.

### 7.3 Transaction Screen

Tujuan: mengelola seluruh transaksi pengguna.

Komponen:
- Daftar transaksi.
- Filter pemasukan dan pengeluaran.
- Filter berdasarkan tanggal.
- Informasi kategori.
- Nominal transaksi.
- Tombol tambah transaksi.

Panduan:
- Setiap transaksi menampilkan nama, kategori, tanggal, dan nominal.
- Pemasukan menggunakan warna hijau.
- Pengeluaran menggunakan warna merah.
- Gunakan pemisah tanggal atau grouping jika diperlukan.

### 7.4 Add Transaction Screen

Tujuan: mencatat pemasukan atau pengeluaran.

Komponen:
- Pilihan jenis transaksi.
- Input nominal.
- Input deskripsi.
- Pilihan kategori.
- Input tanggal.
- Tombol Simpan.

Panduan:
- Form dibuat sederhana dan mudah digunakan.
- Nominal menjadi input utama.
- Validasi ditampilkan dengan jelas.
- Berikan feedback setelah transaksi berhasil disimpan.

### 7.5 Reports Screen

Tujuan: memberikan gambaran aktivitas keuangan berdasarkan periode.

Komponen:
- Filter periode.
- Total pemasukan.
- Total pengeluaran.
- Selisih pemasukan dan pengeluaran.
- Grafik transaksi.
- Ringkasan berdasarkan kategori.

Panduan:
- Grafik harus mudah dibaca.
- Gunakan warna yang konsisten dengan kategori transaksi.
- Informasi nominal harus tetap tersedia, tidak hanya mengandalkan grafik.

### 7.6 Category Screen

Tujuan: mengelola kategori pemasukan dan pengeluaran.

Komponen:
- Daftar kategori.
- Nama kategori.
- Ikon kategori.
- Jenis kategori.
- Tambah kategori.
- Edit dan hapus kategori.

Kategori bawaan dapat mencakup:

**Pengeluaran**
- Makanan
- Transportasi
- Tagihan
- Belanja
- Hiburan
- Kesehatan
- Pendidikan
- Lainnya

**Pemasukan**
- Gaji
- Uang saku
- Bonus
- Freelance
- Investasi
- Lainnya

---

## 8. Iconography

Gunakan ikon bergaya Material Symbols atau Material Icons.

Panduan:
- Gunakan ikon yang mudah dikenali.
- Pertahankan konsistensi bentuk ikon.
- Gunakan ikon untuk memperjelas fungsi, bukan sekadar dekorasi.
- Ikon navigasi harus memiliki ukuran dan alignment konsisten.

Contoh ikon:
- Dashboard: `dashboard`
- Transaksi: `receipt-long`
- Laporan: `bar-chart`
- Kategori: `category`
- Pengaturan: `settings`
- Profil: `person`
- Pemasukan: `trending-up`
- Pengeluaran: `trending-down`
- Tambah: `add`

---

## 9. Spacing & Layout

Gunakan sistem spacing berbasis kelipatan 4 dp.

| Token | Value |
|---|---:|
| XS | 4 dp |
| SM | 8 dp |
| MD | 12 dp |
| LG | 16 dp |
| XL | 24 dp |
| XXL | 32 dp |
| XXXL | 48 dp |

Panduan:
- Gunakan padding halaman sekitar 16–24 dp.
- Berikan jarak yang cukup antar-card.
- Hindari elemen yang terlalu rapat.
- Gunakan alignment yang konsisten.
- Perhatikan safe area pada perangkat mobile.

---

## 10. Motion & Interaction

Gunakan motion sederhana yang mengikuti prinsip Material 3.

Contoh:
- Transisi antarhalaman yang halus.
- Feedback saat tombol ditekan.
- Animasi ringan ketika card atau modal muncul.
- Loading indicator saat data sedang dimuat.
- Feedback visual ketika transaksi berhasil disimpan atau dihapus.

Motion tidak boleh menghambat aktivitas pengguna atau membuat aplikasi terasa berat.

---

## 11. Theme Configuration

Untuk versi awal, gunakan tema terang dengan palet Desert sebagai warna utama.

Struktur token warna yang disarankan:

```js
export const Colors = {
  primary: {
    50: "#FCF7EA",
    100: "#F8EBC9",
    200: "#F1D597",
    300: "#E9B75B",
    400: "#E19B2E",
    500: "#D18521",
    600: "#AA5F18",
    700: "#904818",
    800: "#783B1B",
    900: "#67311C",
    950: "#3B180D",
  },

  semantic: {
    income: "#2E7D32",
    expense: "#C62828",
    warning: "#ED9B24",
    info: "#1976D2",
    success: "#388E3C",
    error: "#D32F2F",
  },

  neutral: {
    background: "#FFFBF5",
    surface: "#FFFFFF",
    surfaceVariant: "#F5EFE5",
    outline: "#82776B",
    textPrimary: "#241A12",
    textSecondary: "#71665C",
    disabled: "#BDB5AA",
  },
};
```

Warna pada konfigurasi ini menjadi sumber utama warna aplikasi. Hindari menuliskan kode HEX secara berulang di masing-masing screen atau component.

---

## 12. Recommended Dependencies

| Package | Kegunaan |
|---|---|
| `react-native-paper` | Komponen Material Design 3 |
| `@react-navigation/native` | Navigasi utama |
| `@react-navigation/bottom-tabs` | Bottom Navigation |
| `@react-navigation/drawer` | Drawer Navigation |
| `react-native-chart-kit` | Grafik keuangan |
| `react-native-svg` | Rendering grafik dan SVG |

Gunakan versi dependency yang kompatibel dengan Expo SDK yang digunakan. Instal package native melalui `npx expo install` jika tersedia agar versi dependensi sesuai dengan SDK.

---

## 13. Design Constraints

Hal-hal yang harus diperhatikan selama implementasi:

1. Jangan menggunakan warna di luar sistem warna tanpa alasan yang jelas.
2. Jangan membuat setiap screen memiliki gaya visual yang berbeda.
3. Jangan menggunakan terlalu banyak card dalam satu halaman.
4. Jangan menggunakan grafik yang sulit dibaca.
5. Jangan mengorbankan keterbacaan demi dekorasi.
6. Jangan membuat navigasi terlalu kompleks.
7. Jangan menggunakan animasi berlebihan.
8. Pastikan desain tetap nyaman pada layar smartphone dengan ukuran berbeda.

---

## 14. Design Acceptance Criteria

Desain dianggap sesuai apabila:

- [ ] Mengikuti prinsip Material You / Material 3.
- [ ] Menggunakan palet Desert sebagai identitas warna.
- [ ] Menggunakan warna semantik untuk pemasukan dan pengeluaran.
- [ ] Memiliki tipografi dan hierarki informasi konsisten.
- [ ] Menggunakan komponen dengan bentuk membulat.
- [ ] Menggunakan Bottom Navigation untuk menu utama.
- [ ] Menggunakan Drawer untuk menu tambahan.
- [ ] Dashboard menampilkan informasi keuangan dengan jelas.
- [ ] Grafik mudah dibaca.
- [ ] Form transaksi mudah digunakan.
- [ ] Layout responsif pada berbagai ukuran smartphone.
- [ ] Seluruh komponen memiliki konsistensi visual.

---

## 15. Final Design Direction

Expense Tracker menggunakan identitas visual **Material You + Desert Palette**.

Karakter desain yang ingin dicapai:

- Modern dan minimalis.
- Hangat melalui warna krem dan cokelat-oranye.
- Bersih dan terstruktur.
- Informasi keuangan mudah dipahami.
- Komponen mengikuti Material Design 3.
- Nyaman digunakan untuk aktivitas pencatatan keuangan harian.

**Design principle:** Prioritaskan keterbacaan informasi keuangan, kemudahan pencatatan transaksi, dan konsistensi pengalaman pengguna.