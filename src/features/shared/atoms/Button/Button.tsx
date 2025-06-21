import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// Importo las propiedades que va a recibir el botón
import { ButtonProps } from './types/type';

// Componente Button que recibe contenido, una función al hacer click y estilos personalizados
const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    // TouchableOpacity me permite hacer el botón "clickeable"
    <TouchableOpacity onPress={onClick} style={[styles.button, style]}>
      {/* Aquí se renderiza el contenido del botón, puede ser texto, íconos, etc. */}
      {children}
    </TouchableOpacity>
  );
};

export default Button;

// Estilos base del botón
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Para que el contenido se muestre en fila
    alignItems: 'center', // Centramos el contenido verticalmente
    paddingVertical: 10, // Espaciado arriba y abajo
    paddingHorizontal: 16, // Espaciado a los lados
    borderRadius: 30, // Bordes súper redondeados (tipo pill button)
    gap: 8, // Espacio entre los hijos dentro del botón
    elevation: 4, // Le da una pequeña sombra en Android
  },
});