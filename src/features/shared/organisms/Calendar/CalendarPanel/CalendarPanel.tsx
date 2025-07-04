// CalendarPanel.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import CalendarGrid from '../../../../../common/components/calendar/calendarGrid';
import DayEventsModal from '../../../../../common/components/modals/eventDayModal';
import { EventType } from './types/types';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getStartDayOffset = (year: number, month: number) => new Date(year, month, 1).getDay();

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function CalendarPanel({
  events = [],
  isLoading,
  error,
}: {
  events?: EventType[];
  isLoading?: boolean;
  error?: string | null;
}) {
  const [selectedEvents, setSelectedEvents] = useState<EventType[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const changeMonth = (dir: 1 | -1) => {
    let month = currentMonth + dir;
    let year = currentYear;

    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }

    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const offset = getStartDayOffset(currentYear, currentMonth);

  const daysArray = Array.from({ length: offset + daysInMonth }, (_, i) => {
    const day = i - offset + 1;
    return i < offset ? null : new Date(currentYear, currentMonth, day);
  });

  const getEventsForDay = (date: Date) =>
    events.filter(e => new Date(e.startDate).toDateString() === date.toDateString());

  if (isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekHeader}>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
          <Text key={i} style={styles.dayHeader}>{d}</Text>
        ))}
      </View>

      <CalendarGrid
        days={daysArray}
        getEventsForDay={getEventsForDay}
        onDayPress={(events) => setSelectedEvents(events)}
      />

      <DayEventsModal
        visible={!!selectedEvents}
        events={selectedEvents || []}
        onClose={() => setSelectedEvents(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dayHeader: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontWeight: '600',
    color: '#888',
    fontSize: 13,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  navButton: {
    padding: 8,
  },
  navText: {
    fontSize: 22,
    color: '#007AFF',
  },
});