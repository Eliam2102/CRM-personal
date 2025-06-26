import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import EventCard from '../../../molecules/Cards/EventCard/EventCard';
import { useNavigation } from '@react-navigation/native';
import { CalendarStackNavigationProp } from '../../../../../navigation/Calendar/types/types';

export interface EventType {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

interface CalendarPanelProps {
  events?: EventType[];
  isLoading?: boolean;
  error?: string | null;
}

export default function CalendarPanel({ events: propEvents, isLoading, error }: CalendarPanelProps) {
  const navigation = useNavigation<CalendarStackNavigationProp>();

  const events = propEvents || [];

  if (isLoading) return <Text>Cargando eventos...</Text>;
  if (error) return <Text style={{ color: 'red' }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Próximos Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.startDate.toLocaleString()}
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