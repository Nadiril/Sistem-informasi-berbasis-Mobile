/**
 * Hook & context catatan: memuat, membuat, mengedit, menghapus, dan menandai favorit.
 * Satu instance state bersama di seluruh layar agar data selalu konsisten.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { cardColors } from '../constants/theme';
import { clearNotes, loadNotes, saveNotes } from '../storage/notesStorage';

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;

const NotesContext = createContext(null);

function createId() {
  return `note_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Urutkan terbaru diperbarui di atas. */
function sortNotes(list) {
  return [...list].sort((a, b) => {
    const left = Date.parse(a.updatedAt) || 0;
    const right = Date.parse(b.updatedAt) || 0;
    return right - left;
  });
}

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  /**
   * Muat catatan dari penyimpanan (FR-01) tanpa memanggil setState
   * secara sinkron dari dalam effect (aman untuk lint react-hooks).
   */
  useEffect(() => {
    let isActive = true;

    loadNotes()
      .then((loaded) => {
        if (isActive) {
          setNotes(sortNotes(loaded));
          setLoadError(null);
        }
      })
      .catch(() => {
        if (isActive) {
          setLoadError('Catatan gagal dimuat dari penyimpanan perangkat.');
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  /** Muat ulang dari aksi pengguna (tombol coba lagi), tampilkan indikator loading. */
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const loaded = await loadNotes();
      setNotes(sortNotes(loaded));
    } catch {
      setLoadError('Catatan gagal dimuat dari penyimpanan perangkat.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Simpan perubahan ke penyimpanan lalu perbarui state.
   * State hanya berubah jika tulis berhasil, sehingga kegagalan tidak
   * pernah ditampilkan sebagai keberhasilan (FR-10).
   */
  const commit = useCallback(
    async (updater) => {
      const previous = notes;
      const next = sortNotes(updater(previous));
      await saveNotes(next);
      setNotes(next);
      return next;
    },
    [notes]
  );

  const getNote = useCallback(
    (id) => notes.find((note) => note.id === id) ?? null,
    [notes]
  );

  const createNote = useCallback(
    async ({ title, content }) => {
      const trimmedTitle = String(title ?? '').trim().slice(0, MAX_TITLE_LENGTH);
      const trimmedContent = String(content ?? '').trim().slice(0, MAX_CONTENT_LENGTH);

      if (!trimmedTitle && !trimmedContent) {
        throw new Error('Judul atau isi catatan wajib diisi.');
      }

      const now = new Date().toISOString();
      const newNote = {
        id: createId(),
        title: trimmedTitle,
        content: trimmedContent,
        color: cardColors[Math.floor(Math.random() * cardColors.length)],
        isFavorite: false,
        createdAt: now,
        updatedAt: now,
      };

      await commit((prev) => [newNote, ...prev]);
      return newNote;
    },
    [commit]
  );

  const updateNote = useCallback(
    async (id, { title, content }) => {
      const trimmedTitle = String(title ?? '').trim().slice(0, MAX_TITLE_LENGTH);
      const trimmedContent = String(content ?? '').trim().slice(0, MAX_CONTENT_LENGTH);

      if (!trimmedTitle && !trimmedContent) {
        throw new Error('Judul atau isi catatan wajib diisi.');
      }

      const now = new Date().toISOString();
      let found = false;

      await commit((prev) =>
        prev.map((note) => {
          if (note.id !== id) {
            return note;
          }
          found = true;
          return {
            ...note,
            title: trimmedTitle,
            content: trimmedContent,
            updatedAt: now,
          };
        })
      );

      if (!found) {
        throw new Error('Catatan tidak ditemukan.');
      }
    },
    [commit]
  );

  const deleteNote = useCallback(
    async (id) => {
      await commit((prev) => prev.filter((note) => note.id !== id));
    },
    [commit]
  );

  const toggleFavorite = useCallback(
    async (id) => {
      let found = false;

      await commit((prev) =>
        prev.map((note) => {
          if (note.id !== id) {
            return note;
          }
          found = true;
          return { ...note, isFavorite: !note.isFavorite };
        })
      );

      if (!found) {
        throw new Error('Catatan tidak ditemukan.');
      }
    },
    [commit]
  );

  const deleteAllNotes = useCallback(async () => {
    await clearNotes();
    setNotes([]);
  }, []);

  const value = useMemo(
    () => ({
      notes,
      isLoading,
      loadError,
      refresh,
      getNote,
      createNote,
      updateNote,
      deleteNote,
      toggleFavorite,
      deleteAllNotes,
    }),
    [
      notes,
      isLoading,
      loadError,
      refresh,
      getNote,
      createNote,
      updateNote,
      deleteNote,
      toggleFavorite,
      deleteAllNotes,
    ]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes harus dipakai di dalam <NotesProvider>.');
  }
  return context;
}
