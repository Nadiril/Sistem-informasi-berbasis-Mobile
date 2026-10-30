# Pertemuan7

Aplikasi manajemen produk toko **"Toko Anda"** dengan **Expo Router**, React Context, dan penyimpanan lokal. Pengguna dapat membuat akun lokal, menambah produk, mencari, menandai unggulan, dan melihat statistik stok.

## Menjalankan

```bash
npm install   # node_modules sudah tersedia
npx expo start
```

Script tambahan:

```bash
npm run lint    # ESLint
npm run check   # expo-doctor
```

## Alur Autentikasi

- Login memakai **email atau nama toko** dan kata sandi (minimal 6 karakter).
- Jika identitas belum terdaftar, akun baru otomatis dibuat (mode demo luring) dan pengguna langsung masuk.
- Nama toko diturunkan dari identitas, misalnya `toko_barokah` menjadi "Toko Barokah".
- Sesi berlaku 30 hari dan disimpan di penyimpanan aman perangkat.
- Jika sesi masih valid, aplikasi langsung membuka tab utama; jika tidak, diarahkan ke `/login`.
- Logout menghapus sesi dan mengembalikan pengguna ke layar Login.

Akun baru juga mendapat empat produk contoh agar dashboard tidak kosong.

## Tab

| Tab | File | Isi |
| --- | --- | --- |
| Home | `src/app/(tabs)/index.js` | Sapaan, tanggal, statistik (total produk, unggulan, nilai stok), tombol tambah, dan empat produk terbaru |
| Pencarian | `src/app/(tabs)/search.js` | Cari nama/kategori/deskripsi, filter status (semua/unggulan/stok habis), dan filter kategori |
| Plus | `src/app/(tabs)/add.js` | Form tambah produk: nama, harga, stok, kategori, deskripsi, dan switch unggulan |
| Unggulan | `src/app/(tabs)/featured.js` | Daftar produk dengan `featured: true` |
| Profil | `src/app/(tabs)/profile.js` | Identitas toko, statistik, catatan keamanan, nilai stok, dan tombol keluar |

Kategori yang tersedia: Makanan, Minuman, Pakaian, Elektronik, Aksesoris, dan Lainnya.

## Penyimpanan

| Data | Lokasi | Key |
| --- | --- | --- |
| Akun pengguna | AsyncStorage | `@pertemuan7/users` |
| Produk | AsyncStorage | `@pertemuan7/products` |
| Sesi login | `expo-secure-store` (Keychain iOS / Keystore Android) | `pertemuan7.session.v1` |

- Kata sandi tidak disimpan mentah: hanya hash **SHA-256** yang dicampur salt acak per pengguna.
- Produk disimpan bersama `ownerId`, sehingga tiap akun hanya melihat produknya sendiri.
- Di web, Keychain/Keystore tidak tersedia; sesi disimpan di memori sehingga pengguna perlu login ulang setelah halaman dimuat ulang.

## Struktur

```
Pertemuan7/
├── src/
│   ├── app/
│   │   ├── _layout.js          # Provider, gerbang autentikasi, stack
│   │   ├── login.js
│   │   └── (tabs)/
│   │       ├── _layout.js      # Bottom tabs
│   │       ├── index.js
│   │       ├── search.js
│   │       ├── add.js
│   │       ├── featured.js
│   │       └── profile.js
│   ├── components/             # Button, Card, Chip, TextField, ProductRow, dll.
│   ├── constants/categories.js # Kategori dan produk contoh
│   ├── context/                # AuthContext, ProductsContext
│   ├── services/               # authService, productService, storage, secureSession
│   ├── theme/index.js
│   └── utils/                  # format.js, validators.js
├── app.json
└── package.json
```

## Catatan

- Produk hanya bisa **ditambah** dan diubah status unggulannya; belum ada fitur edit atau hapus produk.
- Produk contoh ditandai `isSample: true` agar bisa dibedakan dari produk buatan pengguna.
- Jika penulisan produk gagal, state tidak diperbarui sehingga UI tidak menampilkan keberhasilan palsu.
- Sesi di web bersifat sementara (in-memory), berbeda dari Android/iOS yang persisten.

[README utama](../README.md)
