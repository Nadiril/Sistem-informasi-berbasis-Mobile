/**
 * Layar Pengaturan (PRD §5.1 G): informasi aplikasi dan hapus semua catatan
 * dengan konfirmasi (FR-11).
 */

import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotes } from '../hooks/useNotes';
import { NOTES_STORAGE_KEY } from '../storage/notesStorage';
import { colors, radius, spacing, typography } from '../constants/theme';

const APP_NAME = 'Notes App';
const APP_VERSION = '1.0.0';

export default function SettingsScreen() {
  const { notes, deleteAllNotes } = useNotes();
  const favoriteCount = notes.filter((note) => note.isFavorite).length;

  const handleDeleteAll = () => {
    if (notes.length === 0) {
      Alert.alert('Tidak ada catatan', 'Belum ada catatan yang bisa dihapus.');
      return;
    }

    Alert.alert(
      'Hapus semua catatan?',
      `Seluruh ${notes.length} catatan akan dihapus permanen dari perangkat ini.`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus semua',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAllNotes();
              Alert.alert('Selesai', 'Semua catatan telah dihapus.');
            } catch {
              Alert.alert(
                'Gagal menghapus',
                'Seluruh catatan tidak dapat dihapus. Coba lagi.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Pengaturan</Text>

        <Text style={styles.sectionLabel}>Aplikasi</Text>
        <View style={styles.card}>
          <View style={styles.appRow}>
            <View style={styles.appIcon}>
              <Ionicons name="document-text" size={26} color={colors.onPrimary} />
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{APP_NAME}</Text>
              <Text style={styles.appVersion}>Versi {APP_VERSION}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Jumlah catatan</Text>
            <Text style={styles.statValue}>{notes.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Catatan favorit</Text>
            <Text style={styles.statValue}>{favoriteCount}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Penyimpanan</Text>
            <Text style={styles.statValue}>Lokal (perangkat)</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Data</Text>
        <View style={styles.card}>
          <View style={styles.infoLine}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.infoText}>
              Catatan hanya disimpan di perangkat ini ({NOTES_STORAGE_KEY}) dan tidak
              dikirim ke mana pun.
            </Text>
          </View>

          <Pressable
            onPress={handleDeleteAll}
            style={({ pressed }) => [styles.dangerButton, pressed && styles.dangerButtonPressed]}
            accessibilityRole="button"
            accessibilityLabel="Hapus semua catatan"
          >
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
            <Text style={styles.dangerButtonText}>Hapus semua catatan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  screenTitle: {
    ...typography.display,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  appIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    ...typography.title,
    color: colors.text,
  },
  appVersion: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
  },
  statLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statValue: {
    ...typography.heading,
    color: colors.text,
  },
  infoLine: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 46,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.danger,
    backgroundColor: colors.dangerContainer,
  },
  dangerButtonPressed: {
    opacity: 0.8,
  },
  dangerButtonText: {
    ...typography.heading,
    color: colors.danger,
  },
});
