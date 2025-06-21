import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContactCard from '../../molecules/Cards/ContactCard/ContactCard';
import EventCard from '../../molecules/Cards/EventCard/EventCard';
import NotificationCard from '../../molecules/Cards/NotificationCard/NotificationCard';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';

interface DashboardProps {
  contacts: { name: string; imageUri?: string; onPress: () => void }[];
  events: { title: string; date: string; onPress: () => void }[];
  notifications: { message: string; onPress: () => void }[];
  onNavigateContacts: () => void;
  onNavigateCalendar: () => void;
  onNavigateNotifications: () => void;
  onNavigateSettings: () => void;
}

export default function Dashboard({
  contacts,
  events,
  notifications,
  onNavigateContacts,
  onNavigateCalendar,
  onNavigateNotifications,
  onNavigateSettings,
}: DashboardProps) {
  return (
    <View style={styles.container}>
      <Text>Contactos sugeridos:</Text>
      {contacts.map((contact, index) => (
        <ContactCard key={index} {...contact} />
      ))}
      <Button onClick={onNavigateContacts}>
        <Text>Ver todos los contactos</Text>
      </Button>

      <Text>Eventos próximos:</Text>
      {events.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
      <Button onClick={onNavigateCalendar}>
        <Text>Ver todo el calendario</Text>
      </Button>

      <Text>Notificaciones activas:</Text>
      {notifications.map((notification, index) => (
        <NotificationCard key={index} {...notification} />
      ))}
      <Button onClick={onNavigateNotifications}>
        <Text>Ver todas las notificaciones</Text>
      </Button>

      <Button onClick={onNavigateSettings}>
        <Text>Ir a configuración</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
});