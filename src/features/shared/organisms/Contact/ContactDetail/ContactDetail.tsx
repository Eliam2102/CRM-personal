import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import NoteField from '../../../molecules/Field/NoteField';
import PrioritySelector from '../../../molecules/Selector/PrioritySelector';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';

interface ContactDetailViewProps {
  contactId: string;
}

export default function ContactDetailView({ contactId }: ContactDetailViewProps) {
  const navigation = useNavigation();

  const [note, setNote] = useState('');
  const [priority, setPriority] = useState('Alta');

  const handleSaveNote = () => {
    Alert.alert('Nota guardada', `Nota: ${note}`);
  };

  const handleChangePriority = () => {
    const newPriority = priority === 'Alta' ? 'Media' : priority === 'Media' ? 'Baja' : 'Alta';
    setPriority(newPriority);
    Alert.alert('Prioridad cambiada', `Nueva prioridad: ${newPriority}`);
  };

  const handleScheduleReminder = () => {
    Alert.alert('Recordatorio', 'Recordatorio agendado (dummy)');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ProfileHeader name={`ID: ${contactId}`} imageUri={''} onBack={handleBack} />
      <NoteField note={note} onChangeText={setNote} onSave={handleSaveNote} />
      <PrioritySelector priority={priority} onChangePriority={handleChangePriority} />
      <Button onClick={handleScheduleReminder}>
        <Text>Agendar recordatorio</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
});