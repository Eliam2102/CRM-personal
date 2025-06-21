import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../../../atoms/Card/Card';
import Icon from '../../../atoms/Icon/Icon';
import Text from '../../../atoms/Text/Text';
import Button from '../../../atoms/Button/Button';
import { NotificationCardProps } from '../types/NotificationCard';

export default function NotificationCard({ message, onPress }: NotificationCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Icon name="notifications" />
        <Text>{message}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});