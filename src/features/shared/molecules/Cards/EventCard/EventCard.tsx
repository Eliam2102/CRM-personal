import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../../../atoms/Card/Card';
import Text from '../../../atoms/Text/Text';
import Badge from '../../../atoms/Badge/Badge';
import Button from '../../../atoms/Button/Button';
import { EventCardProps } from '../types/EventCard';


export default function EventCard({ title, date, onPress }: EventCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Text>{title}</Text>
        <Badge label={date} />
      </View>
      <Button onClick={onPress}>
        <Text>Ver</Text>
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  info: {
    gap: 4,
  },
});