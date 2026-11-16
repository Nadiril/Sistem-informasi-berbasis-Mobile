import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { LoadingState } from '../../components/AppStates';
import { DrawerContent } from '../../components/navigation/DrawerContent';
import { useApp } from '../../context/AppContext';
import { colors, radii } from '../../theme';

export default function AppLayout() {
  const { phase, currentUser } = useApp();

  if (phase === 'loading') {
    return <LoadingState label="Memuat data keuanganmu..." />;
  }

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'left',
        drawerStyle: {
          backgroundColor: colors.neutral.background,
          borderRadius: radii.xl,
          width: 300,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: 'Beranda' }} />
      <Drawer.Screen name="profile" options={{ title: 'Profil pengguna' }} />
      <Drawer.Screen name="settings" options={{ title: 'Pengaturan' }} />
      <Drawer.Screen name="about" options={{ title: 'Informasi aplikasi' }} />
    </Drawer>
  );
}
