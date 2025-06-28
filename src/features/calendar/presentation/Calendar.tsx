import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';


import CalendarPanel from '../../shared/organisms/Calendar/CalendarPanel/CalendarPanel';
import { CalendarViewModel } from './viewmodel/CalendarViewModel';
import { CalendarEvent } from '../domain/entities/event';
import EventFormModal from '../../shared/organisms/Calendar/ModalEvent/ModalEvent';
import { ContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';
import { useNotificationViewModel } from '../../notifications/presentation/viewmodels/notificationViewModel';

export default function CalendarScreen() {
  const { events, isLoading, error, createEvent, fetchEvents } = CalendarViewModel();
  const { contacts, isLoading: contactsLoading, error: contactsError } = ContactViewModel();
  const { createNotification } = useNotificationViewModel();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log(' useFocusEffect - Fetching events...');
      fetchEvents();
    }, [])
  );

const handleSubmitEvent = async (newEvent: CalendarEvent) => {
  try {
    const { eventId, notificationId } = await createEvent(newEvent);
    console.log('Evento creado con ID:', eventId);
    console.log('Notificación creada con ID:', notificationId);
    await fetchEvents();
    setIsModalVisible(false);
  } catch (error) {
    Alert.alert('Error', 'No se pudo crear el evento');
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.topBar}>
            <Button
              title="Nuevo +"
              onPress={() => {
                console.log('Abriendo modal de nuevo evento');
                setIsModalVisible(true);
              }}
            />
          </View>

          <CalendarPanel events={events} isLoading={isLoading} error={error} />
        </View>

        <EventFormModal
          visible={isModalVisible}
          onClose={() => {
            console.log('Modal cerrado sin guardar');
            setIsModalVisible(false);
          }}
          onSubmit={handleSubmitEvent}
          contacts={contacts}
          contactsLoading={contactsLoading}
          contactsError={contactsError}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
});