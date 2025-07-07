import { ViewStyle } from "react-native";
export interface ProfileHeaderProps {
  name: string;
  imageUri?: string;
  onBack?: () => void;
  style?: ViewStyle;
}