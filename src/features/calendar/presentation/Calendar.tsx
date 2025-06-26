import { SafeAreaView } from 'react-native-safe-area-context'; // 👈 Asegúrate de importar este
import { View, StyleSheet, Button } from 'react-native';
import { useState } from 'react';

import CalendarPanel from '../../shared/organisms/Calendar/CalendarPanel/CalendarPanel';
import { CalendarViewModel } from './viewmodel/CalendarViewModel';
import { CalendarEvent } from '../domain/entities/event';
import EventFormModal from '../../shared/organisms/Calendar/ModalEvent/ModalEvent';
import { ContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';

export default function CalendarScreen() {
  const { events, isLoading, error, createEvent, fetchEvents } = CalendarViewModel();
  const { contacts, isLoading: contactsLoading, error: contactsError } = ContactViewModel();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmitEvent = async (newEvent: CalendarEvent) => {
    await createEvent(newEvent);
    await fetchEvents();
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarPanel events={events} isLoading={isLoading} error={error} />

      <Button title="Crear nuevo evento" onPress={() => setIsModalVisible(true)} />

      <EventFormModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmitEvent}
        contacts={contacts}
        contactsLoading={contactsLoading}
        contactsError={contactsError}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Muy importante para ocupar toda la pantalla
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});