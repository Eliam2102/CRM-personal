import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from '../../shared/organisms/Dashboard/Dashboard';
import { CalendarViewModel } from '../../calendar/presentation/viewmodel/CalendarViewModel';
import { ContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavProp } from '../../../navigation/types/Drawer';
import { useTheme } from '../../../common/hooks/theme';


function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavProp>();

  const { events, fetchEvents } = CalendarViewModel();
  const { contacts, fetchContacts } = ContactViewModel();

  const [loading, setLoading] = useState(true);

  useFocusEffect(
  useCallback(() => {
    let isActive = true;

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEvents(), fetchContacts()]);
      if (isActive) {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [])
);

  // Para el KPI de contactos
  const totalContacts = contacts.length;

  // Para el KPI de eventos del día actual
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventsToday = events.filter(event => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  const totalEventsToday = eventsToday.length;


  // contactos aleatorios para simular "más usados"
  const contactsForDashboard = getRandomItems(contacts, 3).map(contact => ({
  ...contact, // mantiene el id y otros datos
  onPress: () => {
    navigation.navigate('contactsMain', {
      screen: 'contactDetail',
      params: { id: contact.id },
    });
  },
}));

  // Próximos 5 eventos ordenados por fecha de inicio
  console.log('Eventos raw:', events);
//eventos proximos
const upcomingEvents = events
  .filter(event => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  })
  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  .slice(0, 5)
  .map(event => ({
  id: event.id,
  title: event.title,
  date: new Date(event.startDate), // conserva como Date
  onPress: () =>
    navigation.navigate('calendarMain', {
      screen: 'eventDetail',
      params: { id: event.id },
    }),
}));

  console.log('Eventos a mostrar:', upcomingEvents);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Dashboard
        contacts={contactsForDashboard}
        events={upcomingEvents}
        totalContacts={totalContacts}
        totalEventsToday={totalEventsToday}
        notifications={[]}
        onNavigateContacts={() => navigation.navigate('contactsMain', { screen: 'contacts' })}
        onNavigateCalendar={() => navigation.navigate('calendarMain',{screen: 'calendar'})}
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
