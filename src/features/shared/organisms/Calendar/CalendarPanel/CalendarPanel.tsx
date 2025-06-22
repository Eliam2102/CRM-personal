import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import EventCard from '../../../molecules/Cards/EventCard/EventCard';
import { useNavigation } from '@react-navigation/native';
import { CalendarStackNavigationProp } from '../../../../../navigation/Calendar/types/types';

export interface EventType {
  id: string;
  title: string;
  date: string;
}

interface CalendarPanelProps {
  events?: EventType[]; // Hacemos la prop opcional para usar los dummies por defecto
}

export default function CalendarPanel({ events: propEvents }: CalendarPanelProps) {
  const navigation = useNavigation<CalendarStackNavigationProp>();

  // Datos dummy (simulados)
  const dummyEvents: EventType[] = [
    { id: '1', title: 'Reunión de equipo', date: '2023-11-15 10:00' },
    { id: '2', title: 'Presentación con cliente', date: '2023-11-16 14:30' },
    { id: '3', title: 'Revisión de proyecto', date: '2023-11-17 09:15' },
    { id: '4', title: 'Taller de capacitación', date: '2023-11-18 11:00' },
    { id: '5', title: 'Entrega de avances', date: '2023-11-20 16:45' },
  ];

  const events = propEvents || dummyEvents;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Próximos Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            onPress={() => navigation.navigate('eventDetail', { id: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F2F5', // gris muy claro
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  separator: {
    height: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});