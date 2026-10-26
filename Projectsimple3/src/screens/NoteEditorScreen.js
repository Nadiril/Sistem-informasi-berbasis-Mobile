/**
 * Layar editor catatan (PRD §5.1 B, C): membuat catatan baru atau mengedit
 * catatan yang sudah ada, dengan validasi, status menyimpan, dan pesan error.
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotes } from '../hooks/useNotes';
import { colors, radius, spacing, touchTarget, typography } from '../constants/theme';

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;

export default function NoteEditorScreen({ navigation, route }) {
  const noteId = route.params?.noteId;
  const { getNote, createNote, updateNote } = useNotes();

  const existingNote = noteId ? getNote(noteId) : null;
  const isNew = !existingNote;

  const [title, setTitle] = useState(existingNote?.title ?? '');
  const [content, setContent] = useState(existingNote?.content ?? '');
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent) {
      setErrorMessage('Catatan tidak boleh kosong. Isi judul atau isi catatan.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      if (isNew) {
        await createNote({ title: trimmedTitle, content: trimmedContent });
      } else {
        await updateNote(existingNote.id, {
          title: trimmedTitle,
          content: trimmedContent,
        });
      }
      navigation.goBack();
    } catch (error) {
      setErrorMessage(
        error?.message && !error.message.includes('gagal')
          ? error.message
          : 'Catatan gagal disimpan. Coba lagi.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali tanpa menyimpan"
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>{isNew ? 'Catatan Baru' : 'Edit Catatan'}</Text>

          <Pressable
            onPress={handleSave}
            disabled={saving}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
              saving && styles.saveButtonDisabled,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Simpan catatan"
          >
            {saving ? (
              <ActivityIndicator size="small" color={colors.onPrimary} />
            ) : (
              <Text style={styles.saveButtonText}>Simpan</Text>
            )}
          </Pressable>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Judul catatan"
            placeholderTextColor={colors.textMuted}
            style={styles.titleInput}
            maxLength={MAX_TITLE_LENGTH}
            multiline={false}
            returnKeyType="next"
            accessibilityLabel="Judul catatan"
          />

          <View style={styles.divider} />

          <TextInput
            value={content}
            onChangeText={(text) => {
              setContent(text);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Tulis isi catatan di sini..."
            placeholderTextColor={colors.textMuted}
            style={styles.contentInput}
            maxLength={MAX_CONTENT_LENGTH}
            multiline
            textAlignVertical="top"
            accessibilityLabel="Isi catatan"
          />

          <Text style={styles.counter}>
            {title.length}/{MAX_TITLE_LENGTH} judul · {content.length}/{MAX_CONTENT_LENGTH}{' '}
            karakter isi
          </Text>
        </ScrollView>

        {errorMessage ? (
          <View style={styles.errorBanner} accessibilityRole="alert">
            <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  headerButton: {
    ...touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  headerTitle: {
    ...typography.title,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    minWidth: 84,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonDisabled: {
    backgroundColor: colors.textMuted,
  },
  saveButtonText: {
    ...typography.heading,
    color: colors.onPrimary,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  titleInput: {
    ...typography.title,
    fontSize: 22,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  contentInput: {
    ...typography.body,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    minHeight: 240,
    paddingVertical: spacing.sm,
  },
  counter: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.sm + 2,
    borderRadius: radius.md,
    backgroundColor: colors.dangerContainer,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    flex: 1,
  },
});
