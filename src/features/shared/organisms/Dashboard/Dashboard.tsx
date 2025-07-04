import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ContactCard from '../../molecules/Cards/ContactCard/ContactCard';
import Text from '../../atoms/Text/Text';
import Button from '../../atoms/Button/Button';
import MiniCalendar from '../../../../common/components/calendar/calendar';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavProp } from '../../../../navigation/types/Drawer';
import { useTheme } from '../../../../common/hooks/theme';

interface DashboardProps {
  contacts: { name: string; imageUri?: string; onPress: () => void }[];
  events: { title: string; date: string; onPress: () => void }[];
  notifications: { message: string; onPress: () => void }[];
  onNavigateContacts: () => void;
  onNavigateCalendar: () => void;
  onNavigateNotifications: () => void;
  onNavigateSettings: () => void;
}

export default function Dashboard({ contacts, events, notifications, onNavigateContacts, onNavigateCalendar }: DashboardProps) {
  const navigation = useNavigation<DrawerNavProp>();
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Bienvenida */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.onBackground }]}>Bienvenido de nuevo</Text>
        <Text style={[styles.subtitle, { color: theme.onSurface }]}>Aquí tienes un resumen de tu actividad:</Text>
      </View>

      {/* KPIs */}
      <View style={styles.kpiContainer}>
        <View style={[styles.kpiBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.kpiNumber, {color: theme.onSurface}]}>{contacts.length}</Text>
          <Text style={styles.kpiLabel}>Contactos</Text>
        </View>
        <View style={[styles.kpiBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.kpiNumber, , {color: theme.onSurface}]}>{events.length}</Text>
          <Text style={styles.kpiLabel}>Eventos</Text>
        </View>
      </View>

      {/* Mini calendario */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Calendario</Text>
        <MiniCalendar events={events} />
        <Button onClick={onNavigateCalendar} style={[styles.button, { backgroundColor: theme.primary }]}>
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Ver todo el calendario</Text>
        </Button>
      </View>

      {/* Contactos recientes */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.onBackground }]}>Últimos contactos</Text>
        {contacts.slice(0, 3).map((contact, i) => (
          <ContactCard key={i} {...contact} />
        ))}
        <Button onClick={onNavigateContacts} style={[styles.button, { backgroundColor: theme.primary }]}>
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Ver todos los contactos</Text>
        </Button>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
  },
  kpiContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  kpiNumber: {
    fontSize: 20,
    fontWeight: '700',
  },
  kpiLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
});