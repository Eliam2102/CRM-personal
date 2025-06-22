import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import SettingOption from '../../molecules/Option/SettingOption';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';

interface SettingsPanelProps {
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  calendarSyncEnabled: boolean;
  onToggleCalendarSync: () => void;
  onResetApp: () => void;
}

export default function SettingsPanel({
  notificationsEnabled,
  onToggleNotifications,
  calendarSyncEnabled,
  onToggleCalendarSync,
  onResetApp,
}: SettingsPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <SettingOption
        label="Notificaciones"
        iconName="notifications"
        value={notificationsEnabled}
        onToggle={onToggleNotifications} //nop afecta que salg en rojo esto se adtpara luego
      />

      <SettingOption
        label="Sincronizar calendario"
        iconName="calendar-today"
        value={calendarSyncEnabled}
        onToggle={onToggleCalendarSync} //nop afecta que salg en rojo esto se adtpara luego
      />

      <View style={styles.separator} />

      <Button onClick={onResetApp} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Restablecer aplicación</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  resetButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});