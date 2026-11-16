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

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const { phase, currentUser, register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
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

  const handleRegister = async () => {
    setFormError(null);

    if (password !== confirmation) {
      setFieldErrors((current) => ({ ...current, confirmPassword: 'Password belum sama.' }));
      return;
    }

    setSubmitting(true);

    try {
      const result = await register({ name, email, password });

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
          { paddingBottom: insets.bottom + spacing.xxl, paddingTop: insets.top + spacing.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <MaterialCommunityIcons
              accessibilityElementsHidden
              color={colors.primary[900]}
              importantForAccessibility="no-hide-descendants"
              name="note-plus-outline"
              size={30}
            />
          </View>
          <AppText style={styles.brandName} variant="headline">
            Buat akun
          </AppText>
          <AppText color={colors.neutral.textSecondary} style={styles.brandTagline} variant="body">
            Satu akun untuk mencatat keuangan pribadi di {APP_NAME}.
          </AppText>
        </View>

        <View style={styles.form}>
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
            autoComplete="name"
            error={fieldErrors.name}
            label="Nama lengkap"
            maxLength={60}
            onChangeText={(text) => {
              setName(text);
              clearFieldError('name');
            }}
            placeholder="Nama kamu"
            returnKeyType="next"
            value={name}
          />

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
            autoComplete="new-password"
            error={fieldErrors.password}
            helperText="Minimal 6 karakter"
            label="Password"
            maxLength={64}
            onChangeText={(text) => {
              setPassword(text);
              clearFieldError('password');
            }}
            placeholder="Buat password"
            returnKeyType="next"
            secureTextEntry
            value={password}
          />

          <AppTextInput
            autoCapitalize="none"
            autoComplete="new-password"
            error={fieldErrors.confirmPassword}
            label="Ulangi password"
            maxLength={64}
            onChangeText={(text) => {
              setConfirmation(text);
              clearFieldError('confirmPassword');
            }}
            onSubmitEditing={handleRegister}
            placeholder="Ketik ulang password"
            returnKeyType="done"
            secureTextEntry
            value={confirmation}
          />

          <AppButton label="Daftar" loading={submitting} onPress={handleRegister} />
        </View>

        <View style={styles.footer}>
          <AppText color={colors.neutral.textSecondary} variant="body">
            Sudah punya akun?
          </AppText>
          <Link href="/login">
            <AppText color={colors.primary[700]} style={styles.footerLink} variant="bodyStrong">
              Masuk di sini
            </AppText>
          </Link>
        </View>

        <AppText color={colors.neutral.textSecondary} style={styles.disclaimer} variant="caption">
          Password disimpan ter-hash. Data akun tidak pernah dikirim ke server.
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
    marginTop: spacing.xl,
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
