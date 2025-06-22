import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackCalendarParamList } from '../../../navigation/Calendar/types/types';
import EventDetailView from '../../shared/organisms/Calendar/EventDetail/EventDetail';

type EventDetailRouteProp = RouteProp<StackCalendarParamList, 'eventDetail'>;

export default function EventDetailScreen() {
  const route = useRoute<EventDetailRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <EventDetailView eventId={id} />
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