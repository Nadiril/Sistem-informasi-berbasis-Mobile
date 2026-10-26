/**
 * Layar Favorit (PRD §5.1 G / FR-07): menampilkan catatan berisFavorite === true.
 */

import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../hooks/useNotes';
import { colors, spacing, typography } from '../constants/theme';

const HORIZONTAL_PADDING = spacing.lg;
const GRID_GAP = spacing.md;

export default function FavoritesScreen({ navigation }) {
  const { notes, isLoading, deleteNote, toggleFavorite } = useNotes();
  const { width } = useWindowDimensions();

  const cardWidth = Math.floor(
    (width - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2
  );

  const favorites = useMemo(
    () => notes.filter((note) => note.isFavorite),
    [notes]
  );

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
    if (isLoading && favorites.length === 0) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Memuat catatan...</Text>
        </View>
      );
    }

    if (favorites.length === 0) {
      return (
        <EmptyState
          icon="heart-outline"
          title="Belum ada favorit"
          message="Tandai catatan dengan ikon hati agar muncul di sini."
        />
      );
    }

    return (
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
        <Text style={styles.screenTitle}>Favorit</Text>
        <Text style={styles.screenSubtitle}>
          {favorites.length > 0
            ? `${favorites.length} catatan favorit`
            : 'Catatan yang Anda tandai'}
        </Text>
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: spacing.md,
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  columnWrapper: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
});
