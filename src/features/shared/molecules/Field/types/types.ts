export interface NoteFieldProps {
  note: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
}
