import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AppText } from '../../../components/AppText';
import { EmptyState } from '../../../components/AppStates';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { AppButton } from '../../../components/ui/AppButton';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import { Fab } from '../../../components/ui/Fab';
import { FocusablePressable } from '../../../components/ui/FocusablePressable';
import { IconButton } from '../../../components/ui/IconButton';
import { SegmentedControl } from '../../../components/ui/ChoiceChips';
import { SurfaceCard } from '../../../components/ui/SurfaceCard';
import { CATEGORY_ICONS } from '../../../constants/categories';
import { useApp } from '../../../context/AppContext';
import { useFeedback } from '../../../context/FeedbackProvider';
import { useTabBarInset } from '../../../hooks/useTabBarInset';
import { colors, fabClearance, pagePadding, radii, shadows, spacing, withAlpha } from '../../../theme';
import { getCategoryUsageCount } from '../../../utils/report';

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Pengeluaran' },
  { value: 'income', label: 'Pemasukan' },
];

function CategoryEditor({ category, defaultType, categories, onClose, onSave }) {
  const isEditing = Boolean(category);
  const [name, setName] = useState(category?.name || '');
  const [icon, setIcon] = useState(category?.icon || CATEGORY_ICONS[0].name);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      const result = await onSave({
        name,
        icon,
        type: category?.type || defaultType,
      });

      if (!result.ok) {
        setFieldErrors(result.fieldErrors || {});
        return;
      }

      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible>
      <Pressable accessibilityLabel="Tutup formulir" onPress={onClose} style={styles.backdrop} />
      <View pointerEvents="box-none" style={styles.sheetLayer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetWidth}
        >
          <View accessibilityViewIsModal style={styles.sheet}>
            <AppText style={styles.sheetTitle} variant="title">
              {isEditing ? 'Ubah kategori' : 'Tambah kategori'}
            </AppText>

            <AppTextInput
              autoCapitalize="sentences"
              error={fieldErrors.name}
              label="Nama kategori"
              maxLength={30}
              onChangeText={(text) => {
                setName(text);
                setFieldErrors((current) => ({ ...current, name: undefined }));
              }}
              onSubmitEditing={handleSave}
              placeholder="Contoh: Kebutuhan"
              returnKeyType="done"
              value={name}
            />

            <View style={styles.iconBlock}>
              <AppText color={colors.neutral.textSecondary} style={styles.iconLabel} variant="label">
                Ikon
              </AppText>
              <ScrollView style={styles.iconScroll}>
                <View style={styles.iconGrid}>
                  {CATEGORY_ICONS.map((option) => {
                    const selected = option.name === icon;

                    return (
                      <FocusablePressable
                        accessibilityLabel={option.label}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        key={option.name}
                        onPress={() => setIcon(option.name)}
                        style={({ pressed }) => [
                          styles.iconCell,
                          selected && styles.iconCellSelected,
                          pressed && !selected && styles.iconCellPressed,
                        ]}
                      >
                        <MaterialCommunityIcons
                          accessibilityElementsHidden
                          color={selected ? '#FFFFFF' : colors.primary[700]}
                          importantForAccessibility="no-hide-descendants"
                          name={option.name}
                          size={22}
                        />
                      </FocusablePressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View style={styles.sheetActions}>
              <AppButton
                label="Batal"
                onPress={onClose}
                size="sm"
                style={styles.sheetAction}
                variant="outline"
              />
              <AppButton
                label="Simpan"
                loading={saving}
                onPress={handleSave}
                size="sm"
                style={styles.sheetAction}
                variant="primary"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function FallbackPicker({ category, usageCount, alternatives, onClose, onPick }) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible>
      <Pressable accessibilityLabel="Tutup pilihan" onPress={onClose} style={styles.backdrop} />
      <View pointerEvents="box-none" style={styles.sheetLayer}>
        <View accessibilityViewIsModal style={styles.sheet}>
          <AppText style={styles.sheetTitle} variant="title">
            Kategori masih dipakai
          </AppText>
          <AppText color={colors.neutral.textSecondary} variant="body">
            {`"${category.name}" dipakai ${usageCount} transaksi. Pilih kategori pengganti untuk transaksi tersebut.`}
          </AppText>

          <View style={styles.alternativeList}>
            {alternatives.map((alternative) => (
              <FocusablePressable
                accessibilityLabel={`Pindahkan ke ${alternative.name}`}
                accessibilityRole="button"
                key={alternative.id}
                onPress={() => onPick(alternative.id)}
                style={({ pressed }) => [styles.alternativeRow, pressed && styles.alternativePressed]}
              >
                <View style={styles.alternativeIcon}>
                  <MaterialCommunityIcons
                    accessibilityElementsHidden
                    color={colors.primary[700]}
                    importantForAccessibility="no-hide-descendants"
                    name={alternative.icon}
                    size={20}
                  />
                </View>
                <AppText style={styles.alternativeName} variant="bodyStrong">
                  {alternative.name}
                </AppText>
                <MaterialCommunityIcons
                  accessibilityElementsHidden
                  color={colors.neutral.textSecondary}
                  importantForAccessibility="no-hide-descendants"
                  name="chevron-right"
                  size={20}
                />
              </FocusablePressable>
            ))}
          </View>

          <AppButton label="Batal" onPress={onClose} size="sm" variant="outline" />
        </View>
      </View>
    </Modal>
  );
}

export default function CategoriesScreen() {
  const tabBarInset = useTabBarInset();
  const { transactions, categories, addCategory, updateCategory, removeCategory } = useApp();
  const { showFeedback } = useFeedback();

  const [typeFilter, setTypeFilter] = useState('expense');
  const [editor, setEditor] = useState(null);
  const [pendingRemoval, setPendingRemoval] = useState(null);

  const visibleCategories = useMemo(
    () => categories.filter((category) => category.type === typeFilter),
    [categories, typeFilter],
  );

  const alternatives = useMemo(() => {
    if (!pendingRemoval) {
      return [];
    }

    return categories.filter(
      (category) =>
        category.type === pendingRemoval.category.type &&
        category.id !== pendingRemoval.category.id,
    );
  }, [categories, pendingRemoval]);

  const handleSave = async ({ name, icon, type }) => {
    const isEditing = Boolean(editor?.category);

    const result = isEditing
      ? await updateCategory(editor.category.id, { name, icon })
      : await addCategory({ name, icon, type });

    showFeedback(
      result.ok
        ? isEditing
          ? 'Kategori diperbarui.'
          : 'Kategori ditambahkan.'
        : result.error || 'Kategori gagal disimpan.',
      result.ok ? 'success' : 'error',
    );

    return result;
  };

  const confirmDelete = (category) => {
    const usageCount = getCategoryUsageCount(transactions, category.id);

    if (usageCount === 0) {
      Alert.alert('Hapus kategori?', `"${category.name}" akan dihapus dari daftar.`, [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const result = await removeCategory(category.id);
            showFeedback(
              result.ok ? 'Kategori dihapus.' : result.error || 'Kategori gagal dihapus.',
              result.ok ? 'success' : 'error',
            );
          },
        },
      ]);
      return;
    }

    const others = categories.filter(
      (item) => item.type === category.type && item.id !== category.id,
    );

    if (others.length === 0) {
      Alert.alert(
        'Belum bisa dihapus',
        `Kategori ini dipakai ${usageCount} transaksi dan belum ada kategori lain sebagai pengganti. Tambah kategori lain terlebih dahulu.`,
      );
      return;
    }

    setPendingRemoval({ category, usageCount });
  };

  const handlePickFallback = async (fallbackId) => {
    const target = pendingRemoval;
    setPendingRemoval(null);

    if (!target) {
      return;
    }

    const result = await removeCategory(target.category.id, fallbackId);

    showFeedback(
      result.ok
        ? `Kategori dihapus, ${result.movedTransactions} transaksi dipindahkan ke ${result.fallbackName}.`
        : result.error || 'Kategori gagal dihapus.',
      result.ok ? 'success' : 'error',
    );
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        left="menu"
        subtitle={`${visibleCategories.length} kategori ${typeFilter === 'expense' ? 'pengeluaran' : 'pemasukan'}`}
        title="Kategori"
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: tabBarInset + fabClearance },
        ]}
        persistentScrollbar
      >
        <SegmentedControl
          accessibilityLabel="Jenis kategori"
          onChange={setTypeFilter}
          options={TYPE_OPTIONS}
          value={typeFilter}
        />

        {visibleCategories.length > 0 ? (
          <SurfaceCard padded={false}>
            {visibleCategories.map((category, index) => {
              const usageCount = getCategoryUsageCount(transactions, category.id);

              return (
                <View key={category.id} style={index > 0 ? styles.rowDivider : undefined}>
                  <View style={styles.row}>
                    <View style={styles.rowIcon}>
                      <MaterialCommunityIcons
                        accessibilityElementsHidden
                        color={colors.primary[700]}
                        importantForAccessibility="no-hide-descendants"
                        name={category.icon}
                        size={22}
                      />
                    </View>
                    <View style={styles.rowBody}>
                      <AppText numberOfLines={1} variant="bodyStrong">
                        {category.name}
                      </AppText>
                      <AppText color={colors.neutral.textSecondary} variant="caption">
                        {usageCount > 0 ? `Dipakai ${usageCount} transaksi` : 'Belum dipakai'}
                      </AppText>
                    </View>
                    <IconButton
                      accessibilityLabel={`Ubah kategori ${category.name}`}
                      iconName="pencil-outline"
                      onPress={() => setEditor({ category })}
                      size={44}
                      variant="surface"
                    />
                    <IconButton
                      accessibilityLabel={`Hapus kategori ${category.name}`}
                      iconName="trash-can-outline"
                      onPress={() => confirmDelete(category)}
                      size={44}
                      variant="danger"
                    />
                  </View>
                </View>
              );
            })}
          </SurfaceCard>
        ) : (
          <EmptyState
            actionLabel="Tambah kategori"
            iconName="tag-plus-outline"
            message="Kategori bawaan biasanya sudah tersedia. Bila kosong, buat sendiri sesuai kebutuhanmu."
            onAction={() => setEditor({ category: null })}
            title="Belum ada kategori"
          />
        )}
      </ScrollView>

      <Fab
        label="Tambah kategori"
        onPress={() => setEditor({ category: null })}
        style={{ bottom: tabBarInset + spacing.md }}
      />

      {editor ? (
        <CategoryEditor
          category={editor.category}
          categories={categories}
          defaultType={typeFilter}
          onClose={() => setEditor(null)}
          onSave={handleSave}
        />
      ) : null}

      {pendingRemoval ? (
        <FallbackPicker
          alternatives={alternatives}
          category={pendingRemoval.category}
          onClose={() => setPendingRemoval(null)}
          onPick={handlePickFallback}
          usageCount={pendingRemoval.usageCount}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  alternativeIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: radii.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  alternativeList: {
    gap: spacing.sm,
    marginVertical: spacing.lg,
  },
  alternativeName: {
    flex: 1,
  },
  alternativePressed: {
    backgroundColor: colors.primary[50],
  },
  alternativeRow: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: withAlpha(colors.primary[950], 0.1),
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: withAlpha(colors.primary[950], 0.45),
  },
  content: {
    gap: spacing.lg,
    paddingHorizontal: pagePadding,
    paddingTop: spacing.sm,
  },
  iconBlock: {
    gap: spacing.sm,
  },
  iconCell: {
    alignItems: 'center',
    borderColor: withAlpha(colors.primary[950], 0.1),
    borderRadius: radii.sm,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  iconCellPressed: {
    backgroundColor: colors.primary[50],
  },
  iconCellSelected: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  iconLabel: {
    marginLeft: 2,
  },
  iconScroll: {
    maxHeight: 200,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowDivider: {
    borderTopColor: withAlpha(colors.primary[950], 0.06),
    borderTopWidth: 1,
  },
  rowIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary[100],
    borderRadius: radii.pill,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  screen: {
    backgroundColor: colors.neutral.background,
    flex: 1,
  },
  sheet: {
    backgroundColor: colors.neutral.surface,
    borderRadius: radii.xl,
    gap: spacing.lg,
    maxWidth: 420,
    padding: spacing.lg,
    width: '100%',
    ...shadows.floating,
  },
  sheetActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sheetAction: {
    flex: 1,
  },
  sheetLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  sheetTitle: {
    marginBottom: -spacing.sm,
  },
  sheetWidth: {
    width: '100%',
  },
});
