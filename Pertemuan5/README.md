# Pertemuan5

Demo komponen UI **React Native Paper** dalam satu file `App.js`. Layar berjudul "Sistem Akademik Mahasiswa" menampilkan profil mahasiswa, form input profil yang interaktif, dan tabel Kartu Hasil Studi (KHS).

## Menjalankan

```bash
npm install   # node_modules sudah tersedia
npx expo start
```

Lalu pindai QR dengan Expo Go, atau tekan `a` (Android), `i` (iOS), `w` (web).

## Fitur

### Kartu Profil Mahasiswa

- Avatar dari `assets/Profile.jpeg`.
- Nama, NPM, program studi, serta ringkasan semester, IPK, status, dan jenis kelamin.
- Email, nomor HP, dan alamat.
- Chip peminatan yang dihasilkan dari data `mahasiswa.minat`.

### Form Input Profil

Form dibagi menjadi empat bagian:

1. **Identitas**: nama, NPM (maksimal 10 digit), dan `RadioButton` jenis kelamin.
2. **Kontak & alamat**: email, nomor HP, dan alamat multiline.
3. **Akademik**: `SegmentedButtons` untuk program studi dan semester, serta input IPK.
4. **Peminatan & pengaturan**: `Checkbox` empat bidang minat dan dua `Switch` (status aktif dan notifikasi akademik).

Tombol **Simpan Profil** menyalin nilai form ke state `mahasiswa` dan menampilkan `Snackbar`. Tombol **Reset Form** mengembalikan form ke nilai bawaan.

### Kartu Hasil Studi (KHS)

- `DataTable` di dalam `ScrollView` horizontal.
- Empat mata kuliah, masing-masing 3 SKS: Sistem Informasi Berbasis Mobile (`KK312408`), Sistem Basis Data, Desain UI/UX, dan Sistem Informasi Berbasis Web.
- Baris selang-seling dan footer total SKS.

## Data Bawaan

| Field | Nilai |
| --- | --- |
| Nama | M. Nadiril Khoir |
| NPM | 3125101308 |
| Prodi | D3 Manajemen Informatika |
| Semester | 3 |
| IPK | 4.00 |
| Status | Aktif |
| Email | mnadirilkhoir@gmail.com |

## Struktur

```
Pertemuan5/
├── App.js              # Seluruh layar, form, tabel, dan style
├── assets/Profile.jpeg # Foto profil
├── app.json
└── package.json
```

## Catatan

- `HelperText` untuk validasi NPM dan email memakai `visible={false}`, sehingga pesan validasi tidak pernah tampil meskipun nilainya dihitung.
- Footer KHS menulis **13 SKS**, padahal empat mata kuliah × 3 SKS = **12 SKS**.
- `formStatusAktif` bernilai awal `false` sementara profil bawaan berstatus "Aktif". Menekan **Simpan Profil** tanpa mengubah switch akan mengubah status menjadi "Cuti".
- Data peminatan awal berisi `['Fullstack Development']`, tetapi keempat checkbox dimulai dalam keadaan tidak tercentang. Menyimpan tanpa memilih ulang akan mengosongkan peminatan.
- Tombol **Download KHS** hanya memanggil `console.log`, belum ada unduhan sungguhan.

## Script

`npm start`, `npm run android`, `npm run ios`, `npm run web`.

[README utama](../README.md)
