import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importo las propiedades que va a recibir el Badge
import { BadgeProps } from './types/types';

// Componente Badge que muestra una etiqueta con un color de fondo
export default function Badge({ label, color = '#457B9D' }: BadgeProps) {
  return (
    // Contenedor del badge con color de fondo dinámico
    <View style={[styles.badge, { backgroundColor: color }]}>
      {/* Texto que se va a mostrar dentro del badge */}
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

// Estilos para el badge y el texto
const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8, // Espacio lateral dentro del badge
    paddingVertical: 4, // Espacio vertical dentro del badge
    borderRadius: 12, // Bordes redondeados
    alignSelf: 'flex-start', // Para que el badge solo ocupe el ancho del contenido
  },
  text: {
    color: '#FFFFFF', // El texto siempre será blanco
    fontSize: 12, // Tamaño pequeño para el texto
    fontWeight: 'bold', // Texto en negritas para que resalte
  },
});