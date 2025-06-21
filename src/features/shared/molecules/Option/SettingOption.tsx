import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import Switch from '../../atoms/Switch/Switch';
import { SettingOptionProps } from './types/types';


export default function SettingOption({ iconName, label, value, onValueChange }: SettingOptionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Icon name={iconName} />
        <Text>{label}</Text>
      </View>
      <Switch label="" value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});