import { StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme';
import { AppText } from './AppText';
import { IconButton } from './ui/IconButton';

const MAX_PARENT_DEPTH = 6;

function openDrawerFrom(navigation) {
  let node = navigation;
  let depth = 0;

  while (node && depth < MAX_PARENT_DEPTH) {
    if (typeof node.openDrawer === 'function') {
      node.openDrawer();
      return true;
    }

    node = typeof node.getParent === 'function' ? node.getParent() : null;
    depth += 1;
  }

  return false;
}

export function ScreenHeader({
  title,
  subtitle,
  left = 'none',
  titleVariant = 'title',
  right,
  style,
}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleMenuPress = () => {
    if (!openDrawerFrom(navigation)) {
      navigation.dispatch({ type: 'OPEN_DRAWER' });
    }
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingLeft: insets.left, paddingRight: insets.right, paddingTop: insets.top + spacing.xs },
        style,
      ]}
    >
      <View style={styles.bar}>
        {left === 'menu' ? (
          <IconButton
            accessibilityLabel="Buka menu navigasi"
            iconName="menu"
            onPress={handleMenuPress}
          />
        ) : left === 'back' ? (
          <IconButton accessibilityLabel="Kembali" iconName="arrow-left" onPress={handleBackPress} />
        ) : (
          <View style={styles.slot} />
        )}

        <View style={styles.titleBlock}>
          <AppText numberOfLines={2} variant={titleVariant}>
            {title}
          </AppText>
          {subtitle ? (
            <AppText
              color={colors.neutral.textSecondary}
              numberOfLines={2}
              style={styles.subtitle}
              variant="caption"
            >
              {subtitle}
            </AppText>
          ) : null}
        </View>

        <View style={styles.slot}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  container: {
    backgroundColor: colors.neutral.background,
  },
  slot: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  subtitle: {
    marginTop: 2,
  },
  titleBlock: {
    flex: 1,
  },
});
