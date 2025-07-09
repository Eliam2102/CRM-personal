import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CalendarViewModel } from './viewmodel/CalendarViewModel';
import { ContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';
import { useNotificationViewModel } from '../../notifications/presentation/viewmodels/notificationViewModel';
import CalendarPanel from '../../shared/organisms/Calendar/CalendarPanel/CalendarPanel';
import EventFormModal from '../../shared/organisms/Calendar/ModalEvent/ModalEvent';
import { CalendarEvent } from '../domain/entities/event';
import { useTheme } from '../../../common/hooks/theme';

export default function CalendarScreen() {
const theme = useTheme();
  const navigation = useNavigation(); 
  const { events, isLoading, error, createEvent, fetchEvents } = CalendarViewModel();
  const { contacts, isLoading: contactsLoading, error: contactsError } = ContactViewModel();
  const { createNotification } = useNotificationViewModel();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleSubmitEvent = async (newEvent: CalendarEvent) => {
    try {
      await createEvent(newEvent);
      await fetchEvents();
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el evento');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.background}]}>
      <KeyboardAvoidingView
        style={[styles.flex, {backgroundColor: theme.background}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content, {backgroundColor: theme.background}]}>
          {/* 🔙 Botón de regresar */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={[styles.backIcon, {color: theme.onBackground}]}>←</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, {color: theme.onBackground}]}>Calendario</Text>
            <TouchableOpacity style={[styles.addButton, {backgroundColor: theme.surface}]} onPress={() => setIsModalVisible(true)}>
              <Text style={[styles.addButtonText, {color: theme.onSurface}]}>+ Nuevo</Text>
            </TouchableOpacity>
          </View>

          <CalendarPanel events={events} isLoading={isLoading} error={error} />
        </View>

        <EventFormModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
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
    backgroundColor: '#F7F9FC',
  },
  flex: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  // 🔙 Estilo para el botón de regresar
  backButton: {
    position: 'absolute',
    top: -30,
    left: 12,
    zIndex: 10,
    padding: 6,
  },
  backIcon: {
    fontSize: 38,
    color: '#007BFF',
    fontWeight: '600',
  },
});