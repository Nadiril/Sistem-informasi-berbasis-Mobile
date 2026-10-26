/**
 * Bottom navigation tiga tab (PRD §6): Catatan, Favorit, Pengaturan.
 * Tab Catatan menjadi tab awal.
 */

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FavoritesScreen from '../screens/FavoritesScreen';
import NotesScreen from '../screens/NotesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Catatan: { focused: 'document-text', outline: 'document-text-outline' },
  Favorit: { focused: 'heart', outline: 'heart-outline' },
  Pengaturan: { focused: 'settings', outline: 'settings-outline' },
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Catatan"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const name = focused ? icons.focused : icons.outline;
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Catatan"
        component={NotesScreen}
        options={{ tabBarAccessibilityLabel: 'Tab catatan' }}
      />
      <Tab.Screen
        name="Favorit"
        component={FavoritesScreen}
        options={{ tabBarAccessibilityLabel: 'Tab favorit' }}
      />
      <Tab.Screen
        name="Pengaturan"
        component={SettingsScreen}
        options={{ tabBarAccessibilityLabel: 'Tab pengaturan' }}
      />
    </Tab.Navigator>
  );
}
