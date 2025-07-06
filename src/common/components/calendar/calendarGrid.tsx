import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Props } from './types/propsGrid';

export default function CalendarGrid({ days, getEventsForDay, onDayPress }: Props) {
  return (
    <View style={styles.grid}>
      {days.map((date, i) => {
        const events = date ? getEventsForDay(date) : [];

        return (
          <View key={i} style={styles.dayCell}>
            {date ? (
              <TouchableOpacity
                style={[
                  styles.dayButton,
                  events.length > 0 && styles.hasEvent,
                ]}
                onPress={() => events.length > 0 && onDayPress(events)}
              >
                <Text style={styles.dayText}>{date.getDate()}</Text>
                {events.length > 0 && <Text style={styles.eventDot}>•</Text>}
              </TouchableOpacity>
            ) : (
              <View style={styles.dayButton} />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 4 },
  dayButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  hasEvent: { backgroundColor: '#D0E8FF' },
  dayText: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  eventDot: { fontSize: 16, color: '#007AFF', marginTop: 4 },
});