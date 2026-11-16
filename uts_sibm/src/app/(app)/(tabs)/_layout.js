import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router/js-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  colors,
  floatingTabBar,
  fontFamilies,
  radii,
  shadows,
  spacing,
  withAlpha,
} from '../../../theme';

const TAB_DEFINITIONS = [
  {
    name: 'index',
    label: 'Dashboard',
    restingIcon: 'view-dashboard-outline',
    activeIcon: 'view-dashboard',
  },
  {
    name: 'transactions',
    label: 'Transaksi',
    restingIcon: 'receipt-text-outline',
    activeIcon: 'receipt-text',
  },
  {
    name: 'reports',
    label: 'Laporan',
    restingIcon: 'chart-box-outline',
    activeIcon: 'chart-box',
  },
  {
    name: 'categories',
    label: 'Kategori',
    restingIcon: 'tag-multiple-outline',
    activeIcon: 'tag-multiple',
  },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[700],
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: colors.neutral.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: [
          styles.tabBar,
          {
            bottom: floatingTabBar.bottomInset + insets.bottom,
            left: floatingTabBar.horizontalInset + insets.left,
            right: floatingTabBar.horizontalInset + insets.right,
          },
        ],
      }}
    >
      {TAB_DEFINITIONS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarAccessibilityLabel: tab.label,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.indicator, focused && styles.indicatorActive]}>
                <MaterialCommunityIcons
                  accessibilityElementsHidden
                  color={focused ? colors.primary[700] : color}
                  importantForAccessibility="no-hide-descendants"
                  name={focused ? tab.activeIcon : tab.restingIcon}
                  size={22}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  indicator: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    minWidth: 56,
    paddingHorizontal: spacing.sm,
  },
  indicatorActive: {
    backgroundColor: colors.primary[200],
  },
  tabBar: {
    ...shadows.floating,
    backgroundColor: colors.neutral.surface,
    borderColor: withAlpha(colors.primary[950], 0.08),
    borderRadius: radii.xl,
    borderWidth: 1,
    height: floatingTabBar.height,
    paddingBottom: 6,
    paddingTop: 6,
    position: 'absolute',
  },
  tabLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
  },
});
