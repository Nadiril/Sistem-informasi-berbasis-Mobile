import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Screen from '../../components/Screen';
import StatTile from '../../components/StatTile';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import { colors, spacing, typography } from '../../theme';
import { formatCurrency, formatDate, getInitials } from '../../utils/format';

const SECURITY_NOTES = [
  {
    icon: 'lock-closed-outline',
    text: 'Kata sandi disimpan sebagai hash SHA-256 bercampur salt acak, tidak pernah dalam bentuk asli.',
  },
  {
    icon: 'key-outline',
    text: 'Sesi login disimpan di penyimpanan aman perangkat: Keychain di iOS, Keystore di Android.',
  },
  {
    icon: 'phone-portrait-outline',
    text: 'Produk dan akun hanya tersimpan di perangkat ini, tidak dikirim ke server mana pun.',
  },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { stats } = useProducts();

  function confirmSignOut() {
    Alert.alert('Keluar dari akun?', 'Sesi login di perangkat ini akan dihapus.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => signOut() },
    ]);
  }

  return (
    <Screen title="Profil" subtitle="Akun dan keamanan toko Anda" contentContainerStyle={styles.content}>
      <Card>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user?.shopName ?? 'Toko')}</Text>
          </View>
          <View style={styles.identityText}>
            <Text style={styles.shopName} numberOfLines={1}>
              {user?.shopName ?? 'Toko Anda'}
            </Text>
            <Text style={styles.identifier} numberOfLines={1}>
              {user?.email ? user.email : `@${user?.identifier ?? ''}`}
            </Text>
            <Text style={styles.joined}>
              Bergabung sejak {user?.createdAt ? formatDate(user.createdAt) : '-'}
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.statRow}>
        <StatTile label="Produk" value={String(stats.total)} icon="cube-outline" />
        <StatTile label="Unggulan" value={String(stats.featured)} icon="star-outline" tone="featured" />
        <StatTile label="Stok habis" value={String(stats.outOfStock)} icon="alert-circle-outline" />
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
          <Text style={styles.cardTitle}>Keamanan akun</Text>
        </View>
        <View style={styles.notes}>
          {SECURITY_NOTES.map((note) => (
            <View key={note.icon} style={styles.noteRow}>
              <Ionicons name={note.icon} size={16} color={colors.textMuted} style={styles.noteIcon} />
              <Text style={styles.noteText}>{note.text}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total nilai stok</Text>
          <Text style={styles.summaryValue}>{formatCurrency(stats.stockValue)}</Text>
        </View>
      </Card>

      <Button label="Keluar" variant="danger" icon="log-out-outline" onPress={confirmSignOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.subtitle,
    color: colors.onPrimaryContainer,
  },
  identityText: {
    flex: 1,
    gap: 2,
  },
  shopName: {
    ...typography.subtitle,
    color: colors.text,
  },
  identifier: {
    fontSize: 13,
    color: colors.textMuted,
  },
  joined: {
    fontSize: 12,
    color: colors.textFaint,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.subtitle,
    fontSize: 15,
    color: colors.text,
  },
  notes: {
    gap: spacing.md,
  },
  noteRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  noteIcon: {
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});
