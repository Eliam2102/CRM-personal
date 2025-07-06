import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Dashboard from '../../shared/organisms/Dashboard/Dashboard';
import { CalendarViewModel } from '../../calendar/presentation/viewmodel/CalendarViewModel';
import { ContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';
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

      async function loadData() {
        setLoading(true);
        await Promise.all([fetchEvents(), fetchContacts()]);
        if (isActive) setLoading(false);
      }

      loadData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const contactsForDashboard = getRandomItems(contacts, 3).map(contact => ({
    name: contact.name,
    imageUri: contact.imageUri,
    onPress: () => console.log(`Ver ${contact.name}`),
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5)
    .map(event => ({
      title: event.title,
      date: new Date(event.startDate).toDateString(),
      onPress: () => console.log(`Ver evento ${event.title}`),
    }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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