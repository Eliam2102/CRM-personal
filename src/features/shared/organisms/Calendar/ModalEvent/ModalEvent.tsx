import React, { useEffect, useState } from 'react';
import { Modal,View,TextInput, Button, StyleSheet, Alert, Platform, KeyboardAvoidingView, } from 'react-native';
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
    contacts.map(contact => ({ label: contact.name, value: contact.id }))
  );

  useEffect(() => {
    setDropdownItems(
      contacts.map(contact => ({ label: contact.name, value: contact.id }))
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
    pickerType === 'start' ? setStartDate(date) : setEndDate(date);
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
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalBackground}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalWrapper}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid
              extraScrollHeight={20}
            >
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

              <Text style={styles.label}>Inicio</Text>
              <Button
                title={startDate.toLocaleString()}
                onPress={() => {
                  setPickerType('start');
                  setPickerVisible(true);
                }}
              />

              <Text style={styles.label}>Fin</Text>
              <Button
                title={endDate.toLocaleString()}
                onPress={() => {
                  setPickerType('end');
                  setPickerVisible(true);
                }}
              />

              <Text style={styles.label}>Contacto</Text>
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
                listMode="SCROLLVIEW"
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
            </KeyboardAwareScrollView>

            <DateTimePickerModal
              isVisible={pickerVisible}
              mode="datetime"
              date={pickerType === 'start' ? startDate : endDate}
              onConfirm={handleConfirm}
              onCancel={() => setPickerVisible(false)}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default EventFormModal;


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  modalWrapper: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
    color: '#000',
  },
  label: {
    fontWeight: '600',
    color: '#444',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: '#F9F9F9',
  },
  multilineInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#F9F9F9',
    marginTop: 4,
  },
  dropdownContainer: {
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#FFF',
    zIndex: 2000,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  deleteButton: {
    marginTop: 20,
  },
});
