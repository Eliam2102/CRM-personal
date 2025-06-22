import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SettingsPanel from '../../shared/organisms/SettingsPanel/SettingsPanel';

export default function SettingsScreen() {
  // Estados dummy solo para probar
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);

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
    <ScrollView contentContainerStyle={styles.container}>
      <SettingsPanel
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
        calendarSyncEnabled={calendarSyncEnabled}
        onToggleCalendarSync={handleToggleCalendarSync}
        onResetApp={handleResetApp}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});