import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../atoms/Text/Text';
import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';
import { PrioritySelectorProps } from './types/types';


export default function PrioritySelector({ priority, onChangePriority }: PrioritySelectorProps) {
  return (
    <View style={styles.container}>
      <Text>Prioridad:</Text>
      <Badge label={priority} />
      <Button onClick={onChangePriority}>
        <Text>Cambiar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
});