export interface SettingOptionProps {
  iconName: string;
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}