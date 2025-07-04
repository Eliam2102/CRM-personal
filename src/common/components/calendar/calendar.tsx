import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/theme';

type Event = {
  title: string;
  date: string; // formato localDateString
  onPress: () => void;
};

interface MiniCalendarProps {
  events: Event[];
}

const getWeekDays = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // comienza en domingo
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < today;
};

export default function MiniCalendar({ events }: MiniCalendarProps) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  const week = getWeekDays();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Solo mostrar eventos de hoy en adelante
  const futureEvents = events.filter(e => {
    const d = new Date(e.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  });

  const hasEvent = (date: string) => futureEvents.some(e => e.date === date);
  const eventsForSelected = futureEvents.filter(e => e.date === selectedDate);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface }]}>
      <View style={styles.calendarRow}>
        {week.map((date, i) => {
          const dateStr = date.toLocaleDateString();
          const isSelected = dateStr === selectedDate;
          const has = hasEvent(dateStr);
          const isPast = isPastDate(date);

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.dayBox,
                isSelected && { backgroundColor: theme.primary },
                has && styles.hasEventDay,
                isPast && styles.pastDay,
              ]}
              onPress={() => setSelectedDate(dateStr)}
              disabled={isPast} // opcional: deshabilitar días pasados
            >
              <Text
                style={[
                  styles.dayText,
                  {
                    color: isSelected ? theme.onPrimary : theme.primary,
                  },
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.eventList}>
        {eventsForSelected.length === 0 ? (
          <Text style={[styles.noEvents, { color: theme.onSurface }]}>
            No hay eventos para este día.
          </Text>
        ) : (
          eventsForSelected.map((e, i) => (
            <TouchableOpacity
              key={i}
              onPress={e.onPress}
              style={[styles.eventItem, { backgroundColor: theme.surface }]}
            >
              <Text style={{ color: theme.onSurface }}>{e.title}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    gap: 12,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasEventDay: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  pastDay: {
    opacity: 0.4,
  },
  dayText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  eventList: {
    gap: 6,
  },
  eventItem: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
  },
  noEvents: {
    fontStyle: 'italic',
  },
});