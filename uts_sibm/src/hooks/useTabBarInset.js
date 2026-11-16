import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { floatingTabBar } from '../theme';

/**
 * Jarak dari tepi bawah scene ke tepi bawah bottom navigation melayang.
 * Karena bar melayang di atas konten, jarak ini harus dipakai sebagai padding
 * bawah daftar dan sebagai dasar posisi tombol tambah melayang.
 */
export function useTabBarInset() {
  const insets = useSafeAreaInsets();

  return floatingTabBar.height + floatingTabBar.bottomInset + insets.bottom;
}
