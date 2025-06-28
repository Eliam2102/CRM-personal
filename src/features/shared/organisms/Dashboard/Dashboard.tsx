import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ContactCard from '../../molecules/Cards/ContactCard/ContactCard';
import EventCard from '../../molecules/Cards/EventCard/EventCard';
import { useNavigation } from '@react-navigation/native';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { DrawerNavProp } from '../../../../navigation/types/Drawer';

interface DashboardProps {
  contacts: { name: string; imageUri?: string; onPress: () => void }[];
  events: { title: string; date: string; onPress: () => void }[];
  notifications: { message: string; onPress: () => void }[];
  onNavigateContacts: () => void;
  onNavigateCalendar: () => void;
  onNavigateNotifications: () => void;
  onNavigateSettings: () => void;
}


export default function Dashboard({ contacts, events, notifications,}: DashboardProps) {
    
  const navigation = useNavigation<DrawerNavProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contactos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimos contactos:</Text>
        {contacts.map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
        <Button onClick={() => navigation.navigate('contactsMain')} style={styles.button}>
          <Text style={styles.buttonText}>Ver todos los contactos</Text>
        </Button>
      </View>

      {/* Eventos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Eventos próximos:</Text>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
        <Button onClick={() => navigation.navigate('calendarMain')} style={styles.button}>
          <Text style={styles.buttonText}>Ver todo el calendario</Text>
        </Button>
      </View>

      {/* Configuración */}
      <View style={styles.section}>
        <Button onClick={() => navigation.navigate('settingsMain')} style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Ir a configuración</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
    backgroundColor: '#f9f9f9',
  },
  section: {
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
