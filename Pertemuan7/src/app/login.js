import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';
import { colors, radius, spacing, typography } from '../theme';
import { hasErrors, validateLogin, LIMITS } from '../utils/validators';

/**
 * Login menerima dua jenis identitas: email atau nama toko, keduanya dengan
 * kata sandi. Akun baru dibuat otomatis saat identitas belum terdaftar.
 */
export default function LoginScreen() {
  const { signIn } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const validation = validateLogin({ identifier, password });
    setErrors(validation);
    setFormError(null);
    if (hasErrors(validation)) return;

    setSubmitting(true);
    try {
      await signIn({ identifier, password });
      // Perpindahan layar ditangani gerbang autentikasi di root layout.
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Tidak bisa masuk. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen
        insetBottom
        contentContainerStyle={styles.content}
      >
        <View style={styles.form}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Ionicons name="storefront" size={30} color={colors.primary} />
            </View>
            <Text style={styles.title}>Masuk ke toko Anda</Text>
            <Text style={styles.subtitle}>
              Gunakan email atau nama toko, lalu kata sandi Anda.
            </Text>
          </View>

          <View style={styles.fields}>
            <TextField
              label="Email atau nama toko"
              value={identifier}
              onChangeText={setIdentifier}
              error={errors.identifier}
              placeholder="nama@toko.com atau Toko Barokah"
              leftIcon="person-outline"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              textContentType="username"
              maxLength={LIMITS.identifier}
              returnKeyType="next"
            />

            <TextField
              label="Kata sandi"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              hint={errors.password ? undefined : 'Minimal 6 karakter.'}
              placeholder="Masukkan kata sandi"
              leftIcon="lock-closed-outline"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              maxLength={LIMITS.password}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          {formError ? (
            <View style={styles.errorBox} accessibilityRole="alert">
              <Ionicons name="alert-circle-outline" size={18} color={colors.onErrorContainer} />
              <Text style={styles.errorText}>{formError}</Text>
            </View>
          ) : null}

          <Button
            label="Masuk"
            onPress={handleSubmit}
            loading={submitting}
            accessibilityHint="Masuk ke dashboard toko"
          />

          <Text style={styles.note}>
            Belum punya akun? Mengisi identitas yang belum terdaftar akan membuat akun baru di
            perangkat ini.
          </Text>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: spacing.xl,
  },
  form: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    gap: spacing.xl,
  },
  brand: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandMark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 320,
  },
  fields: {
    gap: spacing.lg,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.errorContainer,
    borderRadius: radius.field,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: colors.onErrorContainer,
  },
  note: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
