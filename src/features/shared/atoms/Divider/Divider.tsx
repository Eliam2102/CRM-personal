import React from 'react';
import { View, StyleSheet } from 'react-native';
// Importo las propiedades que va a recibir el Divider
import { DividerProps } from './types/types';

// Componente Divider que funciona como separador visual
export default function Divider({ thickness = 1, color = '#CCCCCC', marginVertical = 8 }: DividerProps) {
  return (
    // El divisor se renderiza como una View con alto, color y márgenes personalizables
    <View style={[styles.divider, { height: thickness, backgroundColor: color, marginVertical }]} />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%', // El divisor siempre ocupa todo el ancho disponible
  },
});