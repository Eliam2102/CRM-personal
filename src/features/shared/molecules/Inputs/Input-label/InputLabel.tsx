import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../../atoms/Input/Input';
import Text from '../../../atoms/Text/Text';
import { InputWithLabelProps } from '../types/label';

const InputLabel = ({ label, value, onChangeText }: InputWithLabelProps) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Input value={value} onChangeText={onChangeText} />
    </View>
  );
};

export default InputLabel;

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
});