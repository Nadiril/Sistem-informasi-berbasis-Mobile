import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppText } from '../../components/AppText';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SurfaceCard } from '../../components/ui/SurfaceCard';
import { APP_NAME } from '../../constants/categories';
import { colors, pagePadding, radii, spacing } from '../../theme';

const TECH_STACK = [
  { label: 'Expo SDK', value: '58' },
  { label: 'React Native', value: '0.88' },
  { label: 'Navigasi', value: 'Expo Router (Tabs + Drawer)' },
  { label: 'Penyimpanan', value: 'AsyncStorage' },
  { label: 'State', value: 'React Context API' },
  { label: 'Grafik', value: 'react-native-chart-kit' },
];

function StackRow({ label, value }) {
  return (
    <View style={styles.stackRow}>
      <AppText color={colors.neutral.textSecondary} variant="body">
        {label}
      </AppText>
      <AppText style={styles.stackValue} variant="bodyStrong">
        {value}
      </AppText>
    </View>
  );
}

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  return (
    <View style={styles.screen}>
      <ScreenHeader left="back" title="Informasi aplikasi" />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xxl },
        ]}
        persistentScrollbar
      >
        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <MaterialCommunityIcons
              accessibilityElementsHidden
              color={colors.primary[900]}
              importantForAccessibility="no-hide-descendants"
              name="wallet-outline"
              size={30}
            />
          </View>
          <AppText style={styles.brandName} variant="headline">
            {APP_NAME}
          </AppText>
          <AppText color={colors.neutral.textSecondary} variant="caption">
            {`Versi ${appVersion}`}
          </AppText>
        </View>

        <SurfaceCard style={styles.block}>
          <AppText variant="body">
            {`${APP_NAME} adalah aplikasi pencatatan keuangan pribadi. Semua data disimpan di perangkat ini tanpa server, tanpa akun daring, dan tanpa koneksi internet.`}
          </AppText>
        </SurfaceCard>

        <SurfaceCard style={styles.block}>
          <AppText style={styles.blockTitle} variant="section">
            Dibangun dengan
          </AppText>
          <View style={styles.stackList}>
            {TECH_STACK.map((item) => (
              <StackRow key={item.label} label={item.label} value={item.value} />
            ))}
          </View>
        </SurfaceCard>

        <SurfaceCard style={styles.block}>
          <AppText style={styles.blockTitle} variant="section">
            Batasan
          </AppText>
          <AppText color={colors.neutral.textSecondary} variant="body">
            Data tidak disinkronkan antarperangkat dan dapat hilang bila aplikasi atau data
            aplikasi dihapus. Autentikasi lokal ditujukan untuk penggunaan pribadi, bukan untuk
            keamanan setingkat layanan berbasis server.
          </AppText>
        </SurfaceCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.md,
  },
  blockTitle: {
    marginBottom: -spacing.sm,
  },
  brand: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  brandIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary[100],
    borderRadius: radii.lg,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  brandName: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  content: {
    gap: spacing.lg,
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  stackList: {
    gap: spacing.md,
  },
  stackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  stackValue: {
    flexShrink: 1,
    textAlign: 'right',
  },
});
