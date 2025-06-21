import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// Importo el tipo de propiedades que voy a recibir para el componente Avatar
import { AvatarProps } from './types/types';

// Componente Avatar que puede recibir una imagen, iniciales y tamaño
export default function Avatar({ imageUri, initials = '', size = 50 }: AvatarProps) {
  return (
    // El contenedor del avatar, le paso tamaño y lo hago circular
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      {imageUri ? (
        // Si me pasan una imagen, la muestro aquí
        <Image source={{ uri: imageUri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        // Si no hay imagen, muestro las iniciales
        <Text style={styles.initials}>{initials}</Text>
      )}
    </View>
  );
}

// Estilos que le doy al avatar
const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#A8DADC', // Color de fondo por defecto
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center', // Centrado horizontal
    overflow: 'hidden', // Para que nada se salga del borde circular
  },
  image: {
    resizeMode: 'cover', // Que la imagen cubra todo el espacio sin deformarse
  },
  initials: {
    color: '#FFFFFF', // Color de las iniciales
    fontWeight: 'bold', // Que las iniciales se vean en negritas
    fontSize: 18, // Tamaño del texto
  },
});