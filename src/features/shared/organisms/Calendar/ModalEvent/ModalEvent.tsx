import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import Text from '../../../atoms/Text/Text';
import { CalendarEventModel } from '../../../../calendar/data/models/CalendarModel';
import { Contact } from '../../../../contactos/domain/entities/contact';

interface EventFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (event: CalendarEventModel) => void;
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: string | null;
}

const EventFormModal = ({ visible, onClose, onSubmit, contacts }: EventFormModalProps) => {
  // Estados para los campos del evento
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 60 * 60 * 1000));
  const [contactId, setContactId] = useState<string>('');

  // Estados para el DatePicker
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<'start' | 'end'>('start');

  // Confirmar fecha
  const handleConfirm = (date: Date) => {
    if (pickerType === 'start') setStartDate(date);
    else setEndDate(date);
    setPickerVisible(false);
  };

  // Mostrar el picker según el tipo
  const showPicker = (type: 'start' | 'end') => {
    setPickerType(type);
    setPickerVisible(true);
  };

  // Guardar el evento
  const handleSubmit = () => {
  const newEvent: CalendarEventModel = {
    id: Date.now().toString(),
    title,
    location,
    notes,
    startDate,
    endDate,
    contactId,
    organizer: '',
    attendees: []
  };
  onSubmit(newEvent);
  resetForm(); 
  onClose();
};

const resetForm = () => {
  setTitle('');
  setLocation('');
  setNotes('');
  setStartDate(new Date());
  setEndDate(new Date(Date.now() + 60 * 60 * 1000));
  setContactId('');
};


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.label}>Título</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Ubicación</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} />

          <Text style={styles.label}>Notas</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Picker para seleccionar el contacto */}
          <Text style={styles.label}>Contacto relacionado</Text>
          <Picker
          selectedValue={contactId}           // El estado que guarda el id seleccionado
          onValueChange={(value) => setContactId(value)} // Actualiza el id seleccionado
          style={styles.input}
        >
          <Picker.Item label="Selecciona un contacto" value="" />
          {contacts.map(contact => (
            <Picker.Item
              key={contact.id}
              label={contact.name}
              value={contact.id}              // Aquí debe ir contact.id exactamente, que es string
            />
          ))}
        </Picker>

          {/* Fecha inicio y fin */}
          <Button title={`Inicio: ${startDate.toLocaleString()}`} onPress={() => showPicker('start')} />
          <Button title={`Fin: ${endDate.toLocaleString()}`} onPress={() => showPicker('end')} />

          {/* Botones */}
          <View style={styles.buttonRow}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Guardar" onPress={handleSubmit} />
          </View>

          {/* DateTimePickerModal */}
          <DateTimePickerModal
            isVisible={pickerVisible}
            mode="datetime"
            date={pickerType === 'start' ? startDate : endDate}
            onConfirm={handleConfirm}
            onCancel={() => setPickerVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EventFormModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});