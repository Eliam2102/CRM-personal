import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SettingsPanel from '../../shared/organisms/SettingsPanel/SettingsPanel';
import { useThemeStore } from '../../../store/theme/themeStore';

export default function SettingsScreen() {
  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
      <SettingsPanel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});
