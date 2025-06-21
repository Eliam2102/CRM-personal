import { StyleProp, TextStyle } from 'react-native';

export interface IconProps {
  name: string; //aqui pues es  el nombre es dependiendo de la classe del icono o nombre del icono
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}