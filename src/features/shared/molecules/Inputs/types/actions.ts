export interface InputActionsProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onExecute: () => void;
}