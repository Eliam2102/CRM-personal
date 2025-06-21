// molecules/Input/input-actions/InputActions.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../../atoms/Input/Input';
import Icon from '../../../atoms/Icono/Icon';
import Button from '../../../atoms/Button/Button';
import { InputActionsProps } from '../types/actions';

//estas de aqui onChangeText, onClear, onExecute
//son las acciones uqe debs configurar para uqe el mismo input se limpie o sea borre gtodo lo que se puse,
//para que se ejecute y puedas validar la regex 

const InputActions = ({ value, onChangeText, onClear, onExecute }: InputActionsProps) => {
  return (
    <View style={styles.container}>
      <Input value={value} onChangeText={onChangeText} />
      <Button onClick={onClear}><Icon name="close" /></Button>
      <Button onClick={onExecute}><Icon name="play-arrow" /></Button>
    </View>
  );
};

export default InputActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});