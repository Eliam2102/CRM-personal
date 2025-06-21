import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: StyleProp<ViewStyle>;
};