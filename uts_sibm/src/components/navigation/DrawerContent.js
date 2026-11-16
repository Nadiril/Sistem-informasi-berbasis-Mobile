import { Alert, StyleSheet, View } from 'react-native';
import { router, usePathname } from 'expo-router';
import { DrawerContentScrollView } from 'expo-router/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, spacing, withAlpha } from '../../theme';
import { useApp } from '../../context/AppContext';
import { AppText } from '../AppText';
import { FocusablePressable } from '../ui/FocusablePressable';

const DRAWER_ITEMS = [
  { path: '/profile', label: 'Profil pengguna', iconName: 'account-outline' },
  { path: '/settings', label: 'Pengaturan', iconName: 'cog-outline' },
  { path: '/about', label: 'Informasi aplikasi', iconName: 'information-outline' },
];

function initialsOf(name) {
  return String(name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function DrawerContent() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { currentUser, logout } = useApp();

  const handleNavigate = (path) => {
    if (pathname === path) {
      return;
    }

    router.push(path);
  };

  const handleLogout = () => {
    Alert.alert('Keluar dari akun?', 'Kamu bisa masuk kembali kapan saja dengan akun ini.', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          const result = await logout();

          if (result.ok) {
            router.replace('/login');
          }
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
    >
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <AppText color={colors.primary[900]} variant="section">
            {initialsOf(currentUser?.name)}
          </AppText>
        </View>
        <AppText numberOfLines={1} style={styles.name} variant="section">
          {currentUser?.name}
        </AppText>
        <AppText color={colors.neutral.textSecondary} numberOfLines={1} variant="caption">
          {currentUser?.email}
        </AppText>
      </View>

      <View style={styles.group}>
        {DRAWER_ITEMS.map((item) => {
          const selected = pathname === item.path;

          return (
            <FocusablePressable
              accessibilityLabel={item.label}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={item.path}
              onPress={() => handleNavigate(item.path)}
              style={({ pressed }) => [
                styles.item,
                selected && styles.itemSelected,
                pressed && styles.itemPressed,
              ]}
            >
              <MaterialCommunityIcons
                accessibilityElementsHidden
                color={selected ? colors.primary[700] : colors.neutral.textPrimary}
                importantForAccessibility="no-hide-descendants"
                name={item.iconName}
                size={22}
              />
              <AppText
                color={selected ? colors.primary[700] : colors.neutral.textPrimary}
                variant="bodyStrong"
              >
                {item.label}
              </AppText>
            </FocusablePressable>
          );
        })}
      </View>

      <View style={styles.divider} />

      <FocusablePressable
        accessibilityLabel="Keluar dari akun"
        accessibilityRole="button"
        onPress={handleLogout}
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      >
        <MaterialCommunityIcons
          accessibilityElementsHidden
          color={colors.semantic.error}
          importantForAccessibility="no-hide-descendants"
          name="logout"
          size={22}
        />
        <AppText color={colors.semantic.error} variant="bodyStrong">
          Keluar
        </AppText>
      </FocusablePressable>

      <AppText color={colors.neutral.textSecondary} style={styles.footnote} variant="caption">
        Data tersimpan lokal di perangkat ini.
      </AppText>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary[200],
    borderRadius: radii.pill,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  divider: {
    backgroundColor: withAlpha(colors.primary[950], 0.1),
    height: 1,
    marginVertical: spacing.md,
    marginHorizontal: spacing.xs,
  },
  footnote: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  group: {
    gap: spacing.xs,
    marginTop: spacing.xl,
  },
  item: {
    alignItems: 'center',
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  itemPressed: {
    backgroundColor: colors.primary[100],
  },
  itemSelected: {
    backgroundColor: colors.primary[100],
  },
  name: {
    marginTop: spacing.md,
  },
  profile: {
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
});
