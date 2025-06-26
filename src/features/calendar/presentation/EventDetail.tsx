import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackCalendarParamList } from '../../../navigation/Calendar/types/types';
import EventDetailView from '../../shared/organisms/Calendar/EventDetail/EventDetail';
import { CalendarViewModel } from './viewmodel/CalendarViewModel';

type EventDetailRouteProp = RouteProp<StackCalendarParamList, 'eventDetail'>;

export default function EventDetailScreen() {
  const route = useRoute<EventDetailRouteProp>();
  const { id } = route.params;

  const {
    fetchEventById,
    selectedEvent,
    isLoading,
    error
  } = CalendarViewModel();

  useEffect(() => {
    fetchEventById(id);
  }, [id]);

  if (isLoading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!selectedEvent) return <Text style={styles.errorText}>No se encontró el evento.</Text>;

  return (
    <View style={styles.container}>
      <EventDetailView event={selectedEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    marginTop: 50,
    textAlign: 'center',
    color: 'red',
  },
});