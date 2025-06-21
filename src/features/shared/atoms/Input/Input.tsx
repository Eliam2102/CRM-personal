import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
// Importo las propiedades personalizadas que voy a recibir en el Input
import { InputProps } from './types/types';

// Componente Input que soporta label, validación de error y otras propiedades nativas de TextInput
const Input = ({ label, error, touched, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      {/* Si me pasan un label, lo muestro arriba del input */}
      {label && <Text style={styles.label}>{label}</Text>}
      
      {/* Input con estilo base, si tiene error y ya fue tocado, le agrego borde rojo */}
      <TextInput
        style={[styles.input, touched && error ? styles.inputError : null]}
        {...rest} // Aquí paso todas las demás props que puede recibir un TextInput
      />

      {/* Si el input fue tocado y tiene error, muestro el mensaje de error */}
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

// Estilos del input
const styles = StyleSheet.create({
  container: {
    width: '100%', // Ocupa todo el ancho disponible
    marginBottom: 16, // Espacio inferior entre inputs
  },
  label: {
    fontSize: 14, // Tamaño del texto del label
    marginBottom: 4, // Espacio entre el label y el input
  },
  input: {
    borderWidth: 1, // Borde del input
    borderColor: '#ccc', // Color del borde por defecto
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 12, // Espacio lateral dentro del input
    paddingVertical: 8, // Espacio superior e inferior dentro del input
  },
  inputError: {
    borderColor: 'red', // Cambia el borde a rojo cuando hay error
  },
  errorText: {
    color: 'red', // Color del mensaje de error
    fontSize: 12, // Tamaño pequeño para el error
    marginTop: 4, // Espacio entre el input y el error
  },
});