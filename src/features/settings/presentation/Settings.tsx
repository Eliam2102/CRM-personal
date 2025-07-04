import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch } from 'react-native';
import SettingsPanel from '../../shared/organisms/SettingsPanel/SettingsPanel';
import { useThemeStore } from '../../../store/theme/themeStore';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);

  const { theme, toggleTheme } = useThemeStore();

  const isDarkMode = theme === 'dark';

  const handleToggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };

  const handleToggleCalendarSync = () => {
    setCalendarSyncEnabled(prev => !prev);
  };

  const handleResetApp = () => {
    console.warn('App restablecida');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' }]}>
      <SettingsPanel
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        calendarSyncEnabled={calendarSyncEnabled}
        onToggleCalendarSync={handleToggleCalendarSync}
        onResetApp={handleResetApp}
      />

      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  switchContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
});