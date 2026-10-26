/**
 * Layar Catatan (PRD §5.1 A, D, E, F): daftar grid dua kolom, pencarian,
 * tombol tambah, konfirmasi hapus, loading, empty state, dan pesan error.
 */

import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import { useNotes } from '../hooks/useNotes';
import { colors, radius, spacing, touchTarget, typography } from '../constants/theme';

const HORIZONTAL_PADDING = spacing.lg;
const GRID_GAP = spacing.md;

export default function NotesScreen({ navigation }) {
  const { notes, isLoading, loadError, refresh, deleteNote, toggleFavorite } = useNotes();
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();

  const cardWidth = Math.floor(
    (width - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2
  );

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return notes;
    }
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(keyword) ||
        note.content.toLowerCase().includes(keyword)
    );
  }, [notes, query]);

  const handleDelete = (note) => {
    Alert.alert(
      'Hapus catatan?',
      note.title ? `"${note.title}" akan dihapus permanen.` : 'Catatan ini akan dihapus permanen.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteNote(note.id);
            } catch {
              Alert.alert('Gagal menghapus', 'Catatan tidak dapat dihapus. Coba lagi.');
            }
          },
        },
      ]
    );
  };

  const handleToggleFavorite = async (note) => {
    try {
      await toggleFavorite(note.id);
    } catch {
      Alert.alert('Gagal', 'Status favorit tidak dapat diubah. Coba lagi.');
    }
  };

  const renderContent = () => {
    if (isLoading && notes.length === 0) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Memuat catatan...</Text>
        </View>
      );
    }

    if (loadError && notes.length === 0) {
      return (
        <View style={styles.centered}>
          <EmptyState
            icon="alert-circle-outline"
            title="Gagal memuat catatan"
            message={loadError}
          />
          <Pressable
            onPress={refresh}
            style={styles.retryButton}
            accessibilityRole="button"
            accessibilityLabel="Coba muat ulang catatan"
          >
            <Ionicons name="refresh" size={18} color={colors.onPrimary} />
            <Text style={styles.retryButtonText}>Coba lagi</Text>
          </Pressable>
        </View>
      );
    }

    if (results.length === 0) {
      return query.trim().length > 0 ? (
        <EmptyState
          icon="search-outline"
          title="Tidak ada hasil"
          message={`Tidak ditemukan catatan untuk "${query.trim()}".`}
        />
      ) : (
        <EmptyState
          icon="document-text-outline"
          title="Belum ada catatan"
          message='Tekan tombol "+" untuk membuat catatan pertama Anda.'
        />
      );
    }

    return (
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            width={cardWidth}
            onPress={() => navigation.navigate('NoteEditor', { noteId: item.id })}
            onToggleFavorite={() => handleToggleFavorite(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.screenTitle}>Catatan</Text>
          <Text style={styles.screenSubtitle}>
            {notes.length > 0 ? `${notes.length} catatan tersimpan` : 'Catatan pribadi Anda'}
          </Text>
        </View>
        <Pressable
          onPress={refresh}
          style={styles.headerIconButton}
          accessibilityRole="button"
          accessibilityLabel="Muat ulang catatan"
        >
          <Ionicons name="refresh-outline" size={22} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      {loadError && notes.length > 0 ? (
        <View style={styles.inlineError}>
          <Ionicons name="warning-outline" size={16} color={colors.danger} />
          <Text style={styles.inlineErrorText}>{loadError}</Text>
        </View>
      ) : null}

      <View style={styles.content}>{renderContent()}</View>

      <Pressable
        onPress={() => navigation.navigate('NoteEditor')}
        style={styles.fab}
        accessibilityRole="button"
        accessibilityLabel="Tambah catatan baru"
      >
        <Ionicons name="add" size={30} color={colors.onPrimary} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: spacing.md,
  },
  headerTextGroup: {
    flex: 1,
  },
  screenTitle: {
    ...typography.display,
    color: colors.text,
  },
  screenSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  headerIconButton: {
    ...touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
  },
  searchWrapper: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  inlineError: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: HORIZONTAL_PADDING,
    marginBottom: spacing.sm,
    padding: spacing.sm + 2,
    borderRadius: radius.md,
    backgroundColor: colors.dangerContainer,
  },
  inlineErrorText: {
    ...typography.caption,
    color: colors.danger,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: spacing.sm,
    paddingBottom: 104,
  },
  columnWrapper: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 58,
    height: 58,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  retryButtonText: {
    ...typography.heading,
    color: colors.onPrimary,
  },
});
