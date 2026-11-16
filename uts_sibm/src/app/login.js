import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { LoadingState } from '../components/AppStates';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { APP_NAME } from '../constants/categories';
import { useApp } from '../context/AppContext';
import { colors, pagePadding, radii, spacing, withAlpha } from '../theme';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { phase, currentUser, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (phase === 'loading') {
    return <LoadingState label="Memuat data keuanganmu..." />;
  }

  if (currentUser) {
    return <Redirect href="/" />;
  }

  const clearFieldError = (field) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleLogin = async () => {
    setFormError(null);
    setSubmitting(true);

    try {
      const result = await login({ email, password });

      if (result.ok) {
        router.replace('/');
        return;
      }

      setFieldErrors(result.fieldErrors || {});
      setFormError(result.error || null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.xxl, paddingTop: insets.top + spacing.xxxl },
        ]}
        keyboardShouldPersistTaps="handled"
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
          <AppText color={colors.neutral.textSecondary} style={styles.brandTagline} variant="body">
            Catat pemasukan dan pengeluaran harian langsung dari ponselmu.
          </AppText>
        </View>

        <View style={styles.form}>
          <AppText variant="title">Masuk</AppText>

          {formError ? (
            <AppText
              accessibilityLiveRegion="assertive"
              color={colors.semantic.error}
              style={styles.errorBox}
              variant="body"
            >
              {formError}
            </AppText>
          ) : null}

          <AppTextInput
            autoCapitalize="none"
            autoComplete="email"
            error={fieldErrors.email}
            keyboardType="email-address"
            label="Email"
            onChangeText={(text) => {
              setEmail(text);
              clearFieldError('email');
            }}
            placeholder="nama@email.com"
            returnKeyType="next"
            value={email}
          />

          <AppTextInput
            autoCapitalize="none"
            autoComplete="current-password"
            error={fieldErrors.password}
            label="Password"
            onChangeText={(text) => {
              setPassword(text);
              clearFieldError('password');
            }}
            onSubmitEditing={handleLogin}
            placeholder="Minimal 6 karakter"
            returnKeyType="done"
            secureTextEntry
            value={password}
          />

          <AppButton label="Masuk" loading={submitting} onPress={handleLogin} />
        </View>

        <View style={styles.footer}>
          <AppText color={colors.neutral.textSecondary} variant="body">
            Belum punya akun?
          </AppText>
          <Link href="/register">
            <AppText color={colors.primary[700]} style={styles.footerLink} variant="bodyStrong">
              Daftar di sini
            </AppText>
          </Link>
        </View>

        <AppText color={colors.neutral.textSecondary} style={styles.disclaimer} variant="caption">
          Akun dan data hanya tersimpan di perangkat ini tanpa server.
        </AppText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
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
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  brandTagline: {
    marginTop: spacing.sm,
    maxWidth: 320,
    textAlign: 'center',
  },
  disclaimer: {
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: withAlpha(colors.semantic.error, 0.08),
    borderColor: withAlpha(colors.semantic.error, 0.3),
    borderRadius: radii.sm,
    borderWidth: 1,
    padding: spacing.md,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
  form: {
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.06),
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.lg,
    marginTop: spacing.xxl,
    padding: spacing.lg,
  },
  scroll: {
    paddingHorizontal: pagePadding,
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
});
