import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AUTH_STATUS, AuthProvider, useAuth } from '../context/AuthContext';
import { ProductsProvider } from '../context/ProductsContext';
import { colors, spacing, typography } from '../theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProductsProvider>
          <StatusBar style="dark" />
          <Navigation />
        </ProductsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

/**
 * Gerbang autentikasi: layar tab hanya bisa dibuka saat sesi ada,
 * layar login hanya bisa dibuka saat sesi belum ada.
 */
function Navigation() {
  const { status } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (status === AUTH_STATUS.LOADING) return;

    const onLoginScreen = segments[0] === 'login';
    if (status === AUTH_STATUS.UNAUTHENTICATED && !onLoginScreen) {
      router.replace('/login');
    } else if (status === AUTH_STATUS.AUTHENTICATED && onLoginScreen) {
      router.replace('/');
    }
  }, [status, segments, router]);

  if (status === AUTH_STATUS.LOADING) return <BootScreen />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
    </Stack>
  );
}

/** Layar awal selama sesi dipulihkan dari penyimpanan aman. */
function BootScreen() {
  return (
    <SafeAreaView style={styles.boot} edges={['top', 'bottom']}>
      <View style={styles.bootMark}>
        <Ionicons name="storefront" size={28} color={colors.primary} />
      </View>
      <Text style={styles.bootTitle}>Toko Anda</Text>
      <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.sm }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  bootMark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  bootTitle: {
    ...typography.title,
    color: colors.text,
  },
});
