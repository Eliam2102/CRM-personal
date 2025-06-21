// components/atoms/Text/Text.tsx
import React from 'react';
import { Text as RNText, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { TextProps } from './types/types';

const Text = ({ children, variant = 'body', style }: TextProps) => {
  return <RNText style={[styles[variant], style]}>{children}</RNText>;
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