/**
 * Kartu catatan untuk layout grid dua kolom (PRD §5.1 A).
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing, touchTarget, typography } from '../constants/theme';
import { formatDateTime } from '../utils/date';

export default function NoteCard({ note, width, onPress, onToggleFavorite, onDelete }) {
  const excerpt = note.content.length > 0 ? note.content : 'Tidak ada isi catatan.';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Buka catatan ${note.title || 'tanpa judul'}`}
      style={({ pressed }) => [
        styles.card,
        { width, backgroundColor: note.color },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.headerRow}>
        <Text numberOfLines={1} style={styles.title}>
          {note.title.length > 0 ? note.title : 'Tanpa judul'}
        </Text>
        <Pressable
          onPress={onToggleFavorite}
          hitSlop={8}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={
            note.isFavorite ? 'Hapus dari favorit' : 'Tandai sebagai favorit'
          }
        >
          <Ionicons
            name={note.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={note.isFavorite ? colors.favoriteActive : colors.textSecondary}
          />
        </Pressable>
      </View>

      <Text numberOfLines={4} style={styles.content}>
        {excerpt}
      </Text>

      <View style={styles.footerRow}>
        <Text numberOfLines={1} style={styles.date}>
          {formatDateTime(note.updatedAt)}
        </Text>
        <Pressable
          onPress={onDelete}
          hitSlop={8}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={`Hapus catatan ${note.title || 'tanpa judul'}`}
        >
          <Ionicons name="trash-outline" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    minHeight: 150,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 31, 0.06)',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    flex: 1,
  },
  content: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 20,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  iconButton: {
    ...touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -spacing.sm,
  },
});
