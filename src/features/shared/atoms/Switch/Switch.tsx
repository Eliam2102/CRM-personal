import React from 'react';
import { View, Text, StyleSheet, Switch as RNSwitch } from 'react-native';
import { SwitchProps } from './types/types';

export default function Switch({ label, value, onValueChange }: SwitchProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNSwitch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});