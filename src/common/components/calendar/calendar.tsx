import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/theme';
import { MiniCalendarProps } from './types/miniCalendar';

const getWeekDays = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    d.setHours(0, 0, 0, 0); // Normalizar
    return d;
  });
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function MiniCalendar({ events }: MiniCalendarProps) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const week = getWeekDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar para comparación

  const eventsForSelected = events
    .filter(e => isSameDay(new Date(e.date), selectedDate))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const hasEvent = (date: Date) =>
    events.some(e => isSameDay(new Date(e.date), date));

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface }]}>
      {/* Fila de días */}
      <View style={styles.calendarRow}>
        {week.map((date, i) => {
          const isSelected = isSameDay(date, selectedDate);
          const isPast = date < today;
          const has = hasEvent(date);

          return (
            <TouchableOpacity
              key={i}
              disabled={isPast}
              style={[
                styles.dayBox,
                isSelected && { backgroundColor: theme.primary },
                has && styles.hasEventDay,
                isPast && styles.disabledDay,
              ]}
              onPress={() => {
                if (!isPast) setSelectedDate(date);
              }}
            >
              <Text
                style={[
                  styles.dayText,
                  {
                    color: isPast
                      ? '#999'
                      : isSelected
                      ? theme.onPrimary
                      : theme.primary,
                  },
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lista de eventos */}
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
              style={[styles.eventItem, { backgroundColor: '#E8F4FF' }]}
            >
              <Text
                style={[
                  styles.eventText,
                  { color: '#007AFF', fontWeight: '600' },
                ]}
              >
                {e.title}
              </Text>
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
  disabledDay: {
    backgroundColor: '#F0F0F0',
    opacity: 0.6,
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
  },
  eventText: {
    fontSize: 15,
  },
  noEvents: {
    fontStyle: 'italic',
  },
});
