import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { NoteFieldProps } from './types/types';

export default function NoteField({ note, onChangeText, onSave }: NoteFieldProps) {
  return (
    <View style={styles.container}>
      <Input value={note} onChangeText={onChangeText} placeholder="Escribe una nota..." />
      <Button onClick={onSave}>
        <Text>Guardar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});