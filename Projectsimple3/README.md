# Projectsimple3

Aplikasi catatan (**Notes App**) berbasis React Native + Expo yang mengimplementasikan `PRD.md` di folder ini. Pengguna dapat membuat, membaca, mengedit, mencari, menghapus, dan memfavoritkan catatan yang tersimpan lokal di perangkat.

## Menjalankan

```bash
npm install   # node_modules sudah tersedia
npx expo start
```

Script tambahan: `npm run lint`.

## Fitur

### Tab Catatan

- Daftar catatan dalam grid dua kolom dengan warna pastel.
- Setiap kartu menampilkan judul, cuplikan isi, tanggal diperbarui, tombol favorit, dan tombol hapus.
- Pencarian judul/isi tanpa membedakan huruf besar-kecil.
- Tombol **+** membuka editor catatan baru.
- Loading indicator, empty state, dan tombol coba lagi saat penyimpanan gagal dibaca.
- Hapus catatan memakai dialog konfirmasi.

### Tab Favorit

- Menampilkan catatan dengan `isFavorite: true`.
- Favorit bisa ditandai/dilepas dari tab mana pun.

### Tab Pengaturan

- Informasi aplikasi, jumlah catatan, jumlah favorit, dan lokasi penyimpanan.
- Tombol **Hapus semua catatan** dengan konfirmasi.

### Editor Catatan

- Modal dengan input judul (maksimal 100 karakter) dan isi (maksimal 10.000 karakter).
- Catatan boleh disimpan dengan judul saja atau isi saja; keduanya kosong ditolak.
- Indikator saat menyimpan dan pesan error jika penyimpanan gagal.
- `KeyboardAvoidingView`, counter karakter, dan tombol simpan.

## Penyimpanan

- Key AsyncStorage: `@notes_app/notes`.
- Nilai berupa `JSON.stringify(notes)`; dibaca dengan `JSON.parse`.
- Catatan lama dinormalisasi: properti yang hilang (termasuk `isFavorite`) diberi nilai default.
- Jika data tidak ada atau JSON rusak, aplikasi mengembalikan daftar kosong agar tidak crash.
- Kegagalan baca/tulis ditampilkan sebagai pesan error, bukan keberhasilan palsu.

Model catatan:

```js
{
  id: "note_...",
  title: "Belajar React Native",
  content: "Mempelajari komponen, state, dan navigasi.",
  color: "#DDEBFF",
  isFavorite: false,
  createdAt: "2026-10-26T05:00:00.000Z",
  updatedAt: "2026-10-26T05:00:00.000Z"
}
```

## Struktur

```
Projectsimple3/
├── App.js                        # Provider + NavigationContainer + stack
├── PRD.md                        # Spesifikasi produk
├── src/
│   ├── components/               # NoteCard, SearchBar, EmptyState
│   ├── constants/theme.js        # Token warna, spacing, radius, tipografi
│   ├── hooks/useNotes.js         # Context + CRUD + favorit
│   ├── navigation/               # BottomTabNavigator
│   ├── screens/                  # Notes, Favorites, Settings, NoteEditor
│   ├── storage/notesStorage.js   # AsyncStorage
│   └── utils/date.js             # Format tanggal Indonesia
├── app.json
└── package.json
```

## Catatan

- `PRD.md` dan implementasi sama-sama menargetkan **Expo SDK 58** (React Native 0.88, React 19.3); PRD telah diperbarui ke revisi 1.1.
- Navigasi memakai React Navigation: native stack untuk `Main` + `NoteEditor` (modal), dan bottom tabs untuk tiga tab utama.
- Hanya tersedia light mode; dark mode masih ada di daftar fitur opsional PRD.
- Tidak ada backend, akun, atau sinkronisasi cloud; seluruh data berada di perangkat.

[README utama](../README.md)
