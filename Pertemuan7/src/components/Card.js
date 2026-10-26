import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme';

/** Kontainer permukaan putih dengan garis tipis, radius 16. */
export default function Card({ children, style, padded = true }) {
  return <View style={[styles.card, padded && styles.padded, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  padded: {
    padding: 16,
  },
});
