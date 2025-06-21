import React from 'react';
import { View, StyleSheet } from 'react-native';
// Importo las propiedades que va a recibir el Card
import { CardProps } from './types/types';

// Componente Card que sirve como contenedor con estilo de tarjeta
const Card = ({ children, style }: CardProps) => {
  return (
    // Contenedor principal de la tarjeta, permite estilos personalizados desde props
    <View style={[styles.card, style]}>
      {/* Aquí puedo renderizar cualquier contenido dentro de la tarjeta */}
      {children}
    </View>
  );
};

export default Card;

// Estilos base de la tarjeta
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta
    borderRadius: 12, // Bordes redondeados
    padding: 16, // Espaciado interno
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad ligera para que sea sutil
    shadowRadius: 4, // Difusión de la sombra
    elevation: 3, // Sombra en Android
  },
});