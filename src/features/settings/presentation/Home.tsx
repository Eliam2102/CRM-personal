import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from '../../shared/organisms/Dashboard/Dashboard';
import { CalendarViewModel } from '../../calendar/presentation/viewmodel/CalendarViewModel';
import { ContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavProp } from '../../../navigation/types/Drawer';



function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavProp>();

  const { events, fetchEvents } = CalendarViewModel();
  const { contacts, fetchContacts } = ContactViewModel();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      await Promise.all([fetchEvents(), fetchContacts()]);
      setLoading(false);
    }
    loadData();
  }, []);

  // contactos aleatorios para simular "más usados"
  const contactsForDashboard = getRandomItems(contacts, 3).map(contact => ({
    name: contact.name,
    imageUri: contact.imageUri,
    onPress: () => console.log(`Ver ${contact.name}`),
  }));

  // Próximos 5 eventos ordenados por fecha de inicio
  console.log('Eventos raw:', events);

  const upcomingEvents = events
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5)
    .map(event => ({
      title: event.title,
      date: new Date(event.startDate).toLocaleDateString(),
      onPress: () => console.log(`Ver evento ${event.title}`),
    }));

  console.log('Eventos a mostrar:', upcomingEvents);

  return (
    <View style={styles.container}>
      <Dashboard
        contacts={contactsForDashboard}
        events={upcomingEvents}
        notifications={[]}
        onNavigateContacts={() => navigation.navigate('contactsMain')}
        onNavigateCalendar={() => navigation.navigate('calendarMain')}
        onNavigateNotifications={() => navigation.navigate('notificationsMain')}
        onNavigateSettings={() => navigation.navigate('settingsMain')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});
