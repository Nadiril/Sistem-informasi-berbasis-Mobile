# Projectsimple2

Aplikasi kasir (POS) bernama **Berkah Jaya**, dibuat dengan React Native + Expo dalam satu file `App.js` (575 baris).

## Menjalankan

```bash
npm install
npx expo start
```

## Fitur

- Header "Selamat datang 👋 / Berkah Jaya" dengan lencana jumlah item di keranjang.
- Grid produk dua kolom (`FlatList`), enam produk hard-coded:

  | Produk | Harga |
  | --- | --- |
  | Kopi | Rp12.000 |
  | Nasi Goreng | Rp18.000 |
  | Mie Goreng | Rp15.000 |
  | Es Teh | Rp5.000 |
  | Roti | Rp8.000 |
  | Jus Jeruk | Rp10.000 |

- Keranjang ("Pesanan") di bagian bawah layar: tombol tambah/kurang jumlah, jumlah 0 otomatis menghapus item.
- Total dan jumlah item dihitung turunan dari state `cart`.
- Tombol **Bayar** memunculkan `Alert.alert('Pembayaran Berhasil', ...)`, lalu mengosongkan keranjang. Pembayaran kosong ditolak dengan peringatan.

## Komponen

- `ProductCard({ product, onAdd })`: kartu produk dengan ikon emoji.
- `CartItem({ item, onIncrease, onDecrease })`: baris item di keranjang.

Harga diformat memakai `toLocaleString('id-ID')`.

## Catatan

- Daftar pesanan hanya menampilkan dua item pertama: `cart.slice(0, 2)` di `App.js` baris 281. Item ketiga dan seterusnya tetap ikut terhitung total, tapi tidak tampil.
- State keranjang hanya tersimpan di memori (`useState`), tidak ada penyimpanan permanen.

## Script

`npm start`, `npm run android`, `npm run ios`, `npm run web`.

[README utama](../README.md)
