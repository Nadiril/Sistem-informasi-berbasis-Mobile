# Product Requirements Document (PRD)
## Notes App — React Native + Expo

**Versi dokumen:** 1.1

**Status:** Draft untuk implementasi MVP  
**Platform target:** Android terlebih dahulu, dengan kemungkinan dukungan iOS melalui Expo  
**Bahasa aplikasi:** Bahasa Indonesia

> **Riwayat revisi 1.1:** target SDK disesuaikan dengan implementasi aktual, yaitu **Expo SDK 58** (React Native 0.88, React 19.3).

---

## 1. Ringkasan Produk

Notes App adalah aplikasi pencatat pribadi yang memungkinkan pengguna membuat, membaca, mengedit, mencari, dan menghapus catatan. Data disimpan secara lokal di perangkat menggunakan AsyncStorage, sehingga MVP tidak membutuhkan akun, backend, atau koneksi internet untuk operasi catatan sehari-hari.

Antarmuka menggunakan gaya **Material 3 / Google Pixel-inspired**: ringan, modern, warna pastel, sudut membulat, tipografi yang jelas, dan navigasi bawah (*bottom navigation*).

## 2. Tujuan Produk

1. Menyediakan cara cepat dan sederhana untuk mencatat ide atau informasi.
2. Menjaga catatan tetap tersedia setelah aplikasi ditutup dan dibuka kembali.
3. Menyediakan pengalaman mobile yang konsisten, mudah dipahami, dan nyaman digunakan.
4. Menjadi project latihan React Native yang mencakup komponen, state, navigasi, CRUD, dan penyimpanan lokal.

### 2.1 Bukan Tujuan MVP

- Login atau registrasi akun.
- Sinkronisasi cloud antarperangkat.
- Backend atau database server.
- Kolaborasi dan berbagi catatan.
- Enkripsi khusus untuk catatan.
- Lampiran foto, audio, atau dokumen.
- Pengingat/notifikasi dan fitur AI.

## 3. Target Pengguna

- Pengguna yang membutuhkan aplikasi catatan pribadi sederhana.
- Pelajar atau mahasiswa yang ingin menyimpan ide, daftar tugas, dan catatan belajar.
- Developer pemula yang menggunakan project ini untuk mempelajari React Native dan Expo.

## 4. Platform dan Tech Stack

| Bagian | Teknologi | Ketentuan |
|---|---|---|
| Framework mobile | React Native | Menggunakan Expo |
| SDK | Expo SDK 58 | Target SDK project |
| Runtime JavaScript | Node.js 24.x | Versi yang kompatibel |
| Package manager | npm 11.x | Gunakan npm |
| Bahasa pemrograman | JavaScript | File `.js` dan `.jsx`, bukan TypeScript |
| Development tools | Expo CLI melalui `npx expo` | Tidak perlu instalasi Expo CLI global |
| Navigasi | React Navigation | Bottom tab navigation |
| Penyimpanan lokal | AsyncStorage | Persistensi data catatan |
| Ikon | `@expo/vector-icons` | Ikon tab dan aksi |
| UI | React Native core components + StyleSheet | Desain Material 3-inspired |
| Pengujian | Expo Go atau development build | Sesuai kompatibilitas SDK |

### 4.1 Kebijakan Kompatibilitas

- Gunakan Node.js 24.x dan npm 11.x.
- Pastikan versi paket sesuai dengan Expo SDK 58.
- Gunakan `npx expo install` untuk paket native yang kompatibel dengan SDK project.
- Gunakan JavaScript saja. Jangan membuat file `.ts` atau `.tsx`.
- Gunakan React Navigation bottom tabs sebagai pola navigasi utama.
- Verifikasi ketersediaan SDK 58 dan dokumentasi resminya sebelum memulai implementasi.
- Jika Expo Go tidak mendukung SDK target, gunakan development build yang sesuai.

## 5. Ruang Lingkup MVP

### 5.1 Fitur Wajib

#### A. Daftar Catatan
- Menampilkan semua catatan.
- Menggunakan layout grid dua kolom pada layar yang memadai.
- Menampilkan judul, cuplikan isi, dan tanggal terakhir diperbarui.
- Menampilkan empty state jika belum ada catatan.

#### B. Membuat Catatan
- Form berisi judul dan isi.
- Pengguna boleh menyimpan catatan dengan hanya mengisi judul atau isi.
- Catatan yang judul dan isinya sama-sama kosong tidak boleh disimpan.
- Tombol simpan menampilkan status saat proses berlangsung.

#### C. Membaca dan Mengedit Catatan
- Pengguna dapat membuka catatan dari daftar.
- Form edit terisi dengan data yang sudah ada.
- Perubahan tersimpan secara lokal.

#### D. Menghapus Catatan
- Tampilkan konfirmasi sebelum menghapus.
- Setelah dikonfirmasi, catatan dihapus dari daftar dan penyimpanan lokal.

#### E. Pencarian
- Pencarian berdasarkan judul dan isi catatan.
- Pencarian tidak membedakan huruf besar/kecil.
- Tampilkan empty state jika tidak ada hasil.

#### F. Persistensi Lokal
- Muat catatan ketika aplikasi dibuka.
- Simpan perubahan ke AsyncStorage.
- Tampilkan indikator loading saat data dimuat.
- Tangani kegagalan baca/tulis dengan pesan yang mudah dipahami.

#### G. Bottom Navigation
- Tab Catatan.
- Tab Favorit.
- Tab Pengaturan.
- Tab Catatan menjadi tab awal.
- Tab Favorit menampilkan catatan yang ditandai favorit.
- Tab Pengaturan menampilkan informasi aplikasi dan opsi menghapus semua catatan dengan konfirmasi.

### 5.2 Fitur Opsional Setelah MVP

- Kategori atau label.
- Pengurutan berdasarkan tanggal dibuat atau diperbarui.
- Dark mode.
- Pin catatan.
- Ekspor dan impor catatan.
- Sinkronisasi cloud.

## 6. Struktur Navigasi

Bottom navigation memiliki tiga tab:

| Tab | Ikon yang Disarankan | Isi |
|---|---|---|
| Catatan | `document-text-outline` | Semua catatan, pencarian, tombol tambah |
| Favorit | `heart-outline` | Catatan yang ditandai favorit |
| Pengaturan | `settings-outline` | Informasi aplikasi dan pengaturan lokal |

### 6.1 Alur Navigasi

- Catatan → tekan tombol tambah → layar editor catatan baru.
- Catatan → pilih kartu → editor dengan data catatan.
- Catatan → tekan ikon hapus → dialog konfirmasi.
- Catatan/Favorit → tekan ikon favorit → status favorit berubah.
- Pengaturan → pilih hapus semua catatan → dialog konfirmasi → data dihapus setelah disetujui.

**Catatan implementasi:** Model data harus memiliki properti `isFavorite: boolean`. Untuk data lama yang belum memiliki properti tersebut, gunakan nilai `false`.

## 7. Persyaratan UI/UX

### 7.1 Arah Visual

- Terinspirasi Material 3 dan tampilan Google Pixel.
- Light mode sebagai tema MVP.
- Latar belakang netral terang.
- Warna aksen indigo atau biru-ungu.
- Kartu catatan menggunakan warna pastel yang tetap mudah dibaca.
- Sudut kartu dan kontrol membulat.
- Tipografi memiliki hierarki jelas.
- Ikon konsisten dan mudah dikenali.
- Ruang kosong yang cukup; hindari tampilan terlalu padat.
- Animasi kecil dan cepat hanya jika mendukung interaksi.

### 7.2 Aksesibilitas dan Ergonomi

- Target sentuh tombol idealnya minimal sekitar 44 × 44 pt.
- Sediakan label aksesibilitas untuk tombol ikon.
- Pastikan kontras teks memadai pada setiap warna kartu.
- Pastikan keyboard tidak menutupi input atau tombol simpan.
- Hormati safe area dan navigasi sistem Android.
- Bottom navigation dapat digunakan bersama navigasi gesture maupun tombol sistem Android.
- Jangan menggunakan warna sebagai satu-satunya indikator status.

## 8. Model Data

Model catatan yang disimpan sebagai JSON:

```js
{
  id: "unique-id",
  title: "Belajar React Native",
  content: "Mempelajari komponen, state, dan navigasi.",
  color: "#DDEBFF",
  isFavorite: false,
  createdAt: "2026-10-26T05:00:00.000Z",
  updatedAt: "2026-10-26T05:00:00.000Z"
}
```

### Ketentuan Data

- `id`: string unik dan stabil.
- `title`: string, maksimal 100 karakter.
- `content`: string, maksimal 10.000 karakter.
- `color`: warna kartu dalam format hex.
- `isFavorite`: boolean.
- `createdAt`: timestamp ISO-8601.
- `updatedAt`: timestamp ISO-8601.

### Penyimpanan

- Key AsyncStorage: `@notes_app/notes`.
- Nilai disimpan dengan `JSON.stringify(notes)`.
- Nilai dibaca dan diparsing dengan `JSON.parse`.
- Jika data tidak ada, gunakan array kosong.
- Jika parsing gagal, tangani error secara aman agar aplikasi tidak crash.
- AsyncStorage tidak terenkripsi. Jangan menyimpan kata sandi atau data sensitif.

## 9. Persyaratan Fungsional

| ID | Persyaratan | Prioritas | Kriteria Penerimaan |
|---|---|---|---|
| FR-01 | Memuat catatan | Must | Catatan tersimpan tampil setelah loading selesai |
| FR-02 | Membuat catatan | Must | Catatan valid muncul di daftar dan tersimpan |
| FR-03 | Membaca catatan | Must | Pengguna dapat membuka catatan dan melihat isinya |
| FR-04 | Mengedit catatan | Must | Perubahan tersimpan dan `updatedAt` diperbarui |
| FR-05 | Menghapus catatan | Must | Catatan hilang setelah konfirmasi dan tetap hilang setelah aplikasi dibuka kembali |
| FR-06 | Mencari catatan | Must | Hasil sesuai judul atau isi tanpa membedakan kapitalisasi |
| FR-07 | Menandai favorit | Must | Status favorit tersimpan dan catatan muncul di tab Favorit |
| FR-08 | Bottom navigation | Must | Tiga tab dapat dibuka dan tab aktif terlihat jelas |
| FR-09 | Empty state | Must | Pesan relevan tampil ketika daftar atau hasil pencarian kosong |
| FR-10 | Penanganan error | Must | Kegagalan penyimpanan tidak ditampilkan sebagai keberhasilan |
| FR-11 | Hapus semua catatan | Should | Harus melalui konfirmasi sebelum seluruh catatan dihapus |

## 10. Persyaratan Nonfungsional

- **Offline-first:** fitur catatan inti bekerja tanpa internet.
- **Persistensi:** data tetap ada setelah aplikasi ditutup dan dibuka kembali.
- **Responsivitas:** UI dapat digunakan pada ukuran layar ponsel umum.
- **Stabilitas:** kesalahan parsing atau penyimpanan ditangani tanpa crash yang tidak perlu.
- **Privasi:** data disimpan lokal dan tidak dikirim ke server.
- **Kinerja:** daftar catatan menggunakan `FlatList`.
- **Pemeliharaan:** komponen UI, logika penyimpanan, tema, dan navigasi dipisahkan ke file berbeda.

## 11. Struktur Folder

```text
notes-app/
├── App.js
├── app.json
├── package.json
├── assets/
└── src/
    ├── components/
    │   ├── NoteCard.js
    │   ├── EmptyState.js
    │   └── SearchBar.js
    ├── navigation/
    │   └── BottomTabNavigator.js
    ├── screens/
    │   ├── NotesScreen.js
    │   ├── FavoritesScreen.js
    │   ├── SettingsScreen.js
    │   └── NoteEditorScreen.js
    ├── hooks/
    │   └── useNotes.js
    ├── storage/
    │   └── notesStorage.js
    ├── constants/
    │   └── theme.js
    └── utils/
        └── date.js
```

## 12. Instalasi dan Inisialisasi

Periksa versi Node.js dan npm:

```bash
node --version
npm --version
```

Versi yang ditargetkan:

- Node.js: `24.x`
- npm: `11.x`

Buat project JavaScript:

```bash
npx create-expo-app@latest notes-app --template blank
cd notes-app
```

Verifikasi SDK yang dihasilkan dan sesuaikan dengan dokumentasi resmi Expo SDK 58 sebelum memasang paket. Template `blank` biasanya memakai JavaScript, tetapi tetap periksa isi project yang dihasilkan.

Pasang dependensi:

```bash
npx expo install @react-native-async-storage/async-storage @expo/vector-icons
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

Validasi konfigurasi:

```bash
npx expo-doctor
npx expo start
```

**Penting:** `create-expo-app@latest` menggunakan template dan SDK default yang tersedia ketika perintah dijalankan. Perintah tersebut tidak menjamin project otomatis memakai SDK 58. Periksa versi `expo` di `package.json` dan ikuti petunjuk resmi untuk SDK 58. Jangan memasang versi paket secara acak karena bisa menyebabkan ketidakcocokan.

## 13. Rencana Implementasi

1. Inisialisasi project JavaScript dan verifikasi Node.js, npm, serta Expo SDK.
2. Buat tema dan komponen UI dasar.
3. Buat lapisan penyimpanan AsyncStorage.
4. Implementasikan fungsi load, create, update, delete, dan favorit.
5. Buat layar Catatan dan pencarian.
6. Buat layar editor catatan.
7. Tambahkan React Navigation bottom tabs.
8. Buat layar Favorit dan Pengaturan.
9. Tambahkan loading, empty state, konfirmasi, dan penanganan error.
10. Uji persistensi dan navigasi di perangkat atau emulator.

## 14. Rencana Pengujian MVP

- [ ] Aplikasi dapat dijalankan di perangkat/emulator yang kompatibel.
- [ ] Bottom navigation menampilkan Catatan, Favorit, dan Pengaturan.
- [ ] Pengguna dapat membuat catatan dengan judul saja.
- [ ] Pengguna dapat membuat catatan dengan isi saja.
- [ ] Catatan kosong ditolak.
- [ ] Pengguna dapat mengedit catatan.
- [ ] Pengguna dapat menghapus catatan setelah konfirmasi.
- [ ] Pencarian menemukan catatan berdasarkan judul.
- [ ] Pencarian menemukan catatan berdasarkan isi.
- [ ] Favorit dapat ditandai dan muncul di tab Favorit.
- [ ] Data tetap tersedia setelah aplikasi ditutup dan dibuka kembali.
- [ ] Kegagalan penyimpanan menampilkan pesan error.
- [ ] Layout tidak tertutup keyboard atau area sistem.

## 15. Definition of Done

MVP dianggap selesai jika seluruh persyaratan berprioritas Must terpenuhi, aplikasi berjalan pada perangkat target, catatan tersimpan secara lokal, bottom navigation berfungsi, dan seluruh alur CRUD serta pencarian telah diuji.

## 16. Referensi Resmi

- Expo Documentation: https://docs.expo.dev/
- Expo SDK Reference: https://docs.expo.dev/versions/latest/
- Expo data storage: https://docs.expo.dev/develop/user-interface/store-data/
- React Navigation: https://reactnavigation.org/
- AsyncStorage: https://react-native-async-storage.github.io/async-storage/

---

**Catatan:** PRD ini menetapkan kebutuhan produk dan rancangan teknis awal. Versi paket yang tepat, ketersediaan SDK 58, dan kompatibilitas Expo Go harus diverifikasi terhadap dokumentasi resmi ketika implementasi dimulai.
