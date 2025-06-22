import React from 'react';
import { View, StyleSheet } from 'react-native';
import NotificationPanel from '../../shared/organisms/Notifications/NotificationPanel/NotificationPanel';

export default function NotificationListScreen() {
  const dummyNotifications = [
    { id: '1', title: 'Nueva actualización', description: 'Revisa las nuevas mejoras de la app.' },
    { id: '2', title: 'Evento próximo', description: 'Tienes un evento programado para mañana.' },
    { id: '3', title: 'Recordatorio', description: 'No olvides contactar a Juan Pérez.' },
    { id: '4', title: 'Notificación general', description: 'Este es un aviso importante del sistema.' },
  ];

  return (
    <View style={styles.container}>
      <NotificationPanel notifications={dummyNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});