export interface SwitchProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}