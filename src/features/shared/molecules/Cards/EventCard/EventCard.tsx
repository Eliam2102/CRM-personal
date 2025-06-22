import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../../../atoms/Card/Card';
import Text from '../../../atoms/Text/Text';
import Badge from '../../../atoms/Badge/Badge';
import { EventCardProps } from '../types/EventCard';

export default function EventCard({ title, date, onPress }: EventCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Badge label={date} />
      </View>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Ver</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    gap: 6,
    maxWidth: '70%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  button: {
    backgroundColor: '#007AFF', // azul primario
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});