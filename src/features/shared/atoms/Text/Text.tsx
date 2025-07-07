// components/atoms/Text/Text.tsx
import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps as RNTextProps,
} from 'react-native';
import { TextProps } from './types/types';

const Text = ({ children, variant = 'body', style, ...rest }: TextProps) => {
  return (
    <RNText style={[styles[variant], style]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
