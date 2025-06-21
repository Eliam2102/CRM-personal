import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
// Importo las propiedades personalizadas para el icono
import { IconProps } from './types/types';
// Uso los íconos de la librería MaterialIcons (de Expo)
import { MaterialIcons } from '@expo/vector-icons';

// Componente Icon que muestra un ícono configurable
const Icon = ({ name, size = 24, color = 'black', style }: IconProps) => {
  return (
    // Renderizo el ícono con el nombre, tamaño, color y estilos que me pasen
    //esto no afecta nada aunque lo vean y slaga como si fuerra erros, funciona bien
    <MaterialIcons name={name} size={size} color={color} style={style} />
  );
};

export default Icon;