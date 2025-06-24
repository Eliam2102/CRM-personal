import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import NoteField from '../../../molecules/Field/NoteField';
import PrioritySelector from '../../../molecules/Selector/PrioritySelector';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import { Contact } from '../../../../contactos/domain/entities/contact';

interface ContactDetailViewProps {
  contact: Contact;
}

export default function ContactDetailView({ contact }: ContactDetailViewProps) {
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
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader name={contact.name} imageUri={contact.imageUri} onBack={handleBack} />

      <View style={styles.section}>
      <Text style={styles.label}>Nombre completo:</Text>
      <Text style={styles.value}>{contact.name}</Text>

      <Text style={styles.label}>Primer Nombre:</Text>
      <Text style={styles.value}>{contact.firstName}</Text>

      <Text style={styles.label}>Apellido:</Text>
      <Text style={styles.value}>{contact.lastName}</Text>

      <Text style={styles.label}>Tipo de Contacto:</Text>
      <Text style={styles.value}>{contact.contactType}</Text>

      <Text style={styles.label}>Es favorito:</Text>
      <Text style={styles.value}>{contact.isFavorite ? 'Sí' : 'No'}</Text>
    </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notas del Contacto</Text>
        <NoteField note={note} onChangeText={setNote} onSave={handleSaveNote} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prioridad</Text>
        <PrioritySelector priority={priority} onChangePriority={handleChangePriority} />
      </View>

      <Button onClick={handleScheduleReminder} style={styles.button}>
        <Text style={styles.buttonText}>Agendar recordatorio</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F0F2F5',
    gap: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555555',
  },
  value: {
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});