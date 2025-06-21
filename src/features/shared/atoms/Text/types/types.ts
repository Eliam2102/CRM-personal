import { StyleProp, TextStyle } from "react-native";

export interface TextProps {
  children: React.ReactNode;
  variant?: 'title' | 'body' | 'error';
  style?: StyleProp<TextStyle>;
}