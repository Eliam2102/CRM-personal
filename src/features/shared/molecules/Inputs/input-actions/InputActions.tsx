import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../../atoms/Input/Input';
import Icon from '../../../atoms/Icon/Icon';
import Button from '../../../atoms/Button/Button';
import { InputActionsProps } from '../types/actions';

const InputActions = ({ value, onChangeText, onClear, onExecute }: InputActionsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input value={value} onChangeText={onChangeText} placeholder="Buscar..." />
      </View>
      <Button onClick={onClear} aria-label="Limpiar">
        <Icon name="close" />
      </Button>
      <Button onClick={onExecute} aria-label="Buscar">
        <Icon name="play-arrow" />
      </Button>
    </View>
  );
};

export default InputActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
  },
});