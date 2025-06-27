import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Text from '../../../atoms/Text/Text';
import { CalendarEventModel } from '../../../../calendar/data/models/CalendarModel';
import { Contact } from '../../../../contactos/domain/entities/contact';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface EventFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (event: CalendarEventModel) => void;
  onDelete?: () => void;
  eventToEdit?: CalendarEventModel | null;
  contacts: Contact[];
  contactsLoading: boolean;
  contactsError: string | null;
}

const EventFormModal = ({
  visible,
  onClose,
  onSubmit,
  onDelete,
  eventToEdit,
  contacts,
}: EventFormModalProps) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 60 * 60 * 1000));
  const [contactId, setContactId] = useState<string>('');

  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<'start' | 'end'>('start');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(
    contacts.map(contact => ({
      label: contact.name,
      value: contact.id,
    }))
  );

  useEffect(() => {
    setDropdownItems(
      contacts.map(contact => ({
        label: contact.name,
        value: contact.id,
      }))
    );
  }, [contacts]);

  useEffect(() => {
    if (visible && eventToEdit) {
      setTitle(eventToEdit.title);
      setLocation(eventToEdit.location);
      setNotes(eventToEdit.notes);
      setStartDate(new Date(eventToEdit.startDate));
      setEndDate(new Date(eventToEdit.endDate));
      setContactId(eventToEdit.contactId ?? '');
    } else if (visible) {
      resetForm();
    }
  }, [visible, eventToEdit]);

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setNotes('');
    setStartDate(new Date());
    setEndDate(new Date(Date.now() + 60 * 60 * 1000));
    setContactId('');
  };

  const handleConfirm = (date: Date) => {
    if (pickerType === 'start') setStartDate(date);
    else setEndDate(date);
    setPickerVisible(false);
  };

  const handleSubmit = () => {
    if (!contactId) {
      Alert.alert('Contacto requerido', 'Por favor selecciona un contacto.');
      return;
    }

    const newEvent: CalendarEventModel = {
      id: eventToEdit?.id ?? Date.now().toString(),
      title,
      location,
      notes,
      startDate,
      endDate,
      contactId,
      organizer: eventToEdit?.organizer ?? '',
      attendees: eventToEdit?.attendees ?? [],
    };

    onSubmit(newEvent);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalBackground}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalWrapper}>

            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid
            >
              <View style={styles.container}>
                <Text style={styles.title}>{eventToEdit ? 'Editar Evento' : 'Nuevo Evento'}</Text>

                <Text style={styles.label}>Título</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Ej. Reunión de equipo"
                />

                <Text style={styles.label}>Ubicación</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Ej. Sala 4 o Zoom"
                />

                <Text style={styles.label}>Notas</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Detalles adicionales..."
                  multiline
                />

                <Button
                  title={`Inicio: ${startDate.toLocaleString()}`}
                  onPress={() => {
                    setPickerType('start');
                    setPickerVisible(true);
                  }}
                />
                <Button
                  title={`Fin: ${endDate.toLocaleString()}`}
                  onPress={() => {
                    setPickerType('end');
                    setPickerVisible(true);
                  }}
                />

                <View style={styles.buttonRow}>
                  <Button title="Cancelar" onPress={onClose} color="#888" />
                  <Button title="Guardar" onPress={handleSubmit} />
                </View>

                {eventToEdit && onDelete && (
                  <View style={styles.deleteButton}>
                    <Button title="Eliminar evento" onPress={onDelete} color="red" />
                  </View>
                )}
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.label}>Contacto relacionado</Text>
              <DropDownPicker
                open={dropdownOpen}
                value={contactId}
                items={dropdownItems}
                setOpen={setDropdownOpen}
                setValue={setContactId}
                setItems={setDropdownItems}
                placeholder="Selecciona un contacto"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
          </View>

          <DateTimePickerModal
            isVisible={pickerVisible}
            mode="datetime"
            date={pickerType === 'start' ? startDate : endDate}
            onConfirm={handleConfirm}
            onCancel={() => setPickerVisible(false)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default EventFormModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000099',
  },
  modalWrapper: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    overflow: 'visible',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    color: 'white',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#F9F9F9',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdownWrapper: {
    zIndex: 3000,
    paddingHorizontal: 16,
    marginBottom: 200,
  },
  dropdown: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#F9F9F9',
  },
  dropdownContainer: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#FFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  deleteButton: {
    marginTop: 16,
  },
});