import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import Screen from '../../components/Screen';
import TextField from '../../components/TextField';
import { CATEGORIES, DEFAULT_CATEGORY } from '../../constants/categories';
import { useProducts } from '../../context/ProductsContext';
import { colors, radius, spacing, typography } from '../../theme';
import { formatCurrency } from '../../utils/format';
import { LIMITS, hasErrors, validateProduct } from '../../utils/validators';

const EMPTY_FORM = {
  name: '',
  price: '',
  stock: '1',
  category: DEFAULT_CATEGORY,
  description: '',
  featured: false,
};

export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct } = useProducts();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSave() {
    const validation = validateProduct(form);
    setErrors(validation);
    if (hasErrors(validation)) return;

    setSaving(true);
    try {
      const product = await addProduct({
        name: form.name,
        price: form.price,
        stock: form.stock,
        category: form.category,
        description: form.description,
        featured: form.featured,
      });
      setSaved(product);
    } catch (error) {
      Alert.alert(
        'Gagal menyimpan',
        error instanceof Error ? error.message : 'Produk belum tersimpan di perangkat.'
      );
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSaved(null);
  }

  if (saved) {
    return (
      <Screen title="Plus" subtitle="Tambah produk" contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.successBox}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={28} color={colors.success} />
            </View>
            <Text style={styles.successTitle}>Produk tersimpan</Text>
            <Text style={styles.successText}>
              {saved.name} ({formatCurrency(saved.price)}) masuk ke daftar produk toko Anda.
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button label="Tambah produk lain" variant="tonal" icon="add" onPress={resetForm} />
          <Button label="Lihat di beranda" variant="outline" onPress={() => router.replace('/')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="Plus" subtitle="Tambah produk baru" contentContainerStyle={styles.content}>
      <View style={styles.fields}>
        <TextField
          label="Nama produk"
          value={form.name}
          onChangeText={(value) => updateField('name', value)}
          error={errors.name}
          placeholder="Contoh: Kopi Susu Gula Aren"
          leftIcon="pricetag-outline"
          maxLength={LIMITS.productName}
          returnKeyType="next"
        />

        <View style={styles.row}>
          <TextField
            label="Harga (Rp)"
            value={form.price}
            onChangeText={(value) => updateField('price', value.replace(/[^\d]/g, ''))}
            error={errors.price}
            placeholder="18000"
            leftIcon="cash-outline"
            keyboardType="numeric"
            maxLength={10}
            containerStyle={styles.flex}
          />
          <TextField
            label="Stok"
            value={form.stock}
            onChangeText={(value) => updateField('stock', value.replace(/[^\d]/g, ''))}
            error={errors.stock}
            placeholder="10"
            leftIcon="layers-outline"
            keyboardType="numeric"
            maxLength={6}
            containerStyle={styles.flex}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Kategori</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((category) => (
              <Chip
                key={category.value}
                label={category.value}
                selected={form.category === category.value}
                onPress={() => updateField('category', category.value)}
              />
            ))}
          </View>
        </View>

        <TextField
          label="Deskripsi"
          value={form.description}
          onChangeText={(value) => updateField('description', value)}
          error={errors.description}
          hint={errors.description ? undefined : 'Opsional, maksimal 200 karakter.'}
          placeholder="Bahan, ukuran, atau catatan lain"
          multiline
          maxLength={LIMITS.description}
        />

        <Card>
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <Text style={styles.toggleTitle}>Jadikan unggulan</Text>
              <Text style={styles.toggleHint}>Produk tampil di tab Unggulan.</Text>
            </View>
            <Switch
              value={form.featured}
              onValueChange={(value) => updateField('featured', value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={form.featured ? colors.primary : undefined}
              accessibilityLabel="Jadikan unggulan"
            />
          </View>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button label="Simpan produk" onPress={handleSave} loading={saving} icon="checkmark" />
        <Button
          label="Batal"
          variant="ghost"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          disabled={saving}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  fields: {
    gap: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  toggleText: {
    flex: 1,
    gap: 2,
  },
  toggleTitle: {
    ...typography.subtitle,
    fontSize: 15,
    color: colors.text,
  },
  toggleHint: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  actions: {
    gap: spacing.sm,
  },
  successBox: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  successIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.successContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  successText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
