# REVISI PRD — EXPENSE TRACKER
## Local Storage menggunakan AsyncStorage

### 1. Informasi Proyek

| Informasi | Detail |
|---|---|
| Framework | React Native |
| Runtime | Expo |
| Bahasa | JavaScript |
| Navigation | Bottom Tabs & Drawer |
| Storage | AsyncStorage |
| State Management | React Context API |
| Authentication | Local Authentication |
| Chart Library | react-native-chart-kit atau sejenisnya |
| Backend | Tidak digunakan |
| Database Server | Tidak digunakan |

### 2. Authentication

Sistem Login dan Register menggunakan penyimpanan lokal pada perangkat.

**Fitur:**
- Register akun baru.
- Login menggunakan email dan password.
- Logout.
- Validasi email dan password.
- Menyimpan informasi akun secara lokal.
- Mempertahankan sesi login setelah aplikasi ditutup.

**Ketentuan:**
- Data akun disimpan menggunakan AsyncStorage.
- Email harus unik.
- Password minimal 6 karakter.
- Password tidak boleh disimpan dalam bentuk plaintext.
- Pengguna yang belum login diarahkan ke halaman Login.
- Pengguna yang sudah login dapat langsung masuk ke Dashboard ketika membuka aplikasi kembali.

### 3. Dashboard

Dashboard mengambil data langsung dari penyimpanan lokal.

**Informasi:**
- Total saldo.
- Total pemasukan.
- Total pengeluaran.
- Grafik pemasukan dan pengeluaran.
- Riwayat aktivitas pencatatan terbaru.

**Ketentuan:**
- Dashboard diperbarui setiap kali transaksi berubah.
- Perhitungan saldo berdasarkan transaksi pengguna.
- Data tetap tersedia setelah aplikasi ditutup.

### 4. Manajemen Transaksi

**Fitur:**
- Tambah pemasukan.
- Tambah pengeluaran.
- Edit transaksi.
- Hapus transaksi.
- Detail transaksi.
- Riwayat transaksi.
- Filter berdasarkan kategori.
- Filter berdasarkan tanggal.
- Filter berdasarkan jenis transaksi.

**Ketentuan:**
- Data transaksi disimpan menggunakan AsyncStorage.
- Setiap transaksi memiliki ID unik.
- Setiap transaksi memiliki userId.
- Data transaksi dipisahkan berdasarkan pengguna.
- Perubahan transaksi langsung memperbarui Dashboard dan Laporan.

### 5. Kategori Transaksi

**Fitur:**
- Menampilkan kategori.
- Menambahkan kategori.
- Mengedit kategori.
- Menghapus kategori.
- Memisahkan kategori pemasukan dan pengeluaran.

**Ketentuan:**
- Kategori disimpan menggunakan AsyncStorage.
- Kategori bawaan disediakan ketika aplikasi pertama kali dijalankan.
- Kategori tambahan pengguna disimpan secara lokal.
- Kategori yang sudah digunakan transaksi harus ditangani sebelum dihapus.

### 6. Laporan Keuangan

**Fitur:**
- Laporan harian.
- Laporan mingguan.
- Laporan bulanan.
- Laporan tahunan.
- Total pemasukan.
- Total pengeluaran.
- Saldo bersih.
- Ringkasan kategori.
- Grafik keuangan.

**Ketentuan:**
- Data laporan diambil dari AsyncStorage.
- Perhitungan dilakukan berdasarkan transaksi pengguna.
- Laporan diperbarui ketika transaksi berubah.
- Pengguna dapat memilih periode laporan.

### 7. Kebutuhan Penyimpanan Lokal

Gunakan `@react-native-async-storage/async-storage` sebagai media penyimpanan lokal.

Data yang disimpan:

| Storage Key | Data |
|---|---|
| users | Informasi akun pengguna |
| currentUser | Informasi pengguna yang sedang login |
| transactions | Data pemasukan dan pengeluaran |
| categories | Data kategori transaksi |

**Contoh struktur penyimpanan:**

```javascript
{
  users: [],
  currentUser: null,
  transactions: [],
  categories: []
}
```

Data disimpan dalam format JSON menggunakan AsyncStorage.

**Ketentuan:**
- Gunakan fungsi asynchronous untuk membaca dan menyimpan data.
- Gunakan JSON.stringify() untuk menyimpan objek.
- Gunakan JSON.parse() untuk membaca objek.
- Gunakan React Context API untuk mengelola state aplikasi.
- Setiap perubahan data harus disimpan kembali ke AsyncStorage.
- Pastikan proses pembacaan data selesai sebelum menampilkan Dashboard.

### 8. Kebutuhan Teknis

**Frontend:**
- React Native.
- Expo.
- JavaScript.
- React Navigation.
- Bottom Tabs Navigation.
- Drawer Navigation.

**Storage:**
- AsyncStorage.
- Local Storage Management.

**State Management:**
- React Context API.
- useState.
- useContext.
- useEffect.
- useReducer jika diperlukan.

**Authentication:**
- Local Authentication.
- AsyncStorage untuk data akun.
- Penyimpanan kredensial yang aman jika diperlukan.

**Chart:**
- react-native-chart-kit atau library grafik sejenis.

### 9. Non-Functional Requirements

1. Aplikasi dapat berjalan pada Android melalui Expo.
2. Aplikasi dapat digunakan tanpa koneksi internet.
3. Data tersimpan secara lokal pada perangkat.
4. Data tetap tersedia setelah aplikasi ditutup.
5. Data setiap pengguna harus terpisah berdasarkan userId.
6. Aplikasi memiliki validasi input.
7. Perhitungan saldo harus akurat.
8. Operasi penyimpanan menggunakan asynchronous process.
9. Aplikasi menangani kegagalan membaca dan menyimpan data.
10. Struktur penyimpanan memungkinkan migrasi ke database atau backend pada pengembangan selanjutnya.

### 10. Batasan Proyek

- Tidak menggunakan backend.
- Tidak menggunakan Firebase.
- Tidak menggunakan Supabase.
- Tidak menggunakan SQLite.
- Tidak membutuhkan koneksi internet.
- Data hanya tersimpan pada perangkat pengguna.
- Tidak ada sinkronisasi antarperangkat.
- Data dapat hilang jika aplikasi dihapus atau data aplikasi dihapus.
- Autentikasi lokal ditujukan untuk penggunaan pribadi/prototipe, bukan keamanan setingkat autentikasi server.

### 11. Acceptance Criteria

Aplikasi dinyatakan memenuhi MVP apabila:

1. Pengguna dapat melakukan registrasi.
2. Pengguna dapat login.
3. Pengguna dapat logout.
4. Sesi login tetap tersedia setelah aplikasi dibuka kembali.
5. Pengguna dapat mencatat pemasukan.
6. Pengguna dapat mencatat pengeluaran.
7. Pengguna dapat mengedit dan menghapus transaksi.
8. Pengguna dapat mengelola kategori.
9. Dashboard menampilkan saldo secara akurat.
10. Dashboard menampilkan total pemasukan dan pengeluaran.
11. Dashboard menampilkan aktivitas terbaru.
12. Grafik menampilkan data yang benar.
13. Bottom Tabs dan Drawer Navigation berfungsi.
14. Laporan dapat difilter berdasarkan periode.
15. Seluruh data tersimpan menggunakan AsyncStorage.
16. Data tetap tersedia setelah aplikasi ditutup dan dibuka kembali.
17. Data antar pengguna tidak tercampur.