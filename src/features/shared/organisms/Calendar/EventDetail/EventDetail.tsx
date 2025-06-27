import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { CalendarEvent } from '../../../../calendar/domain/entities/event';
import { ContactViewModel } from '../../../../contactos/presentation/viewmodel/ContactViewModel';

interface EventDetailViewProps {
  event: CalendarEvent;
}

export default function EventDetailView({ event }: EventDetailViewProps) {
  const navigation = useNavigation();
  const { fetchContactById, selectedContact, isLoading } = ContactViewModel();
  const [contactName, setContactName] = useState<string>('Cargando...');

  useEffect(() => {
  const loadContactName = async () => {
    if (event.contactId) {
      const contacto = await fetchContactById(event.contactId);
      setContactName(contacto?.name ?? 'No asignado');
    } else {
      setContactName('No asignado');
    }
  };

  loadContactName();
}, [event.contactId]);

  const handleScheduleReminder = () => {
    Alert.alert(
      'Recordatorio Agendado',
      `Se ha creado un recordatorio para el evento "${event.title}"`,
      [{ text: 'OK' }]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ProfileHeader name={event.title} imageUri={''} onBack={handleBack} />

        <View style={styles.content}>
          <View style={styles.detailCard}>
            <Text style={styles.sectionTitle}>Información del Evento</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fecha:</Text>
              <Text style={styles.detailValue}>
                {event.startDate.toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hora:</Text>
              <Text style={styles.detailValue}>
                {event.startDate.toLocaleTimeString()} - {event.endDate.toLocaleTimeString()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Lugar:</Text>
              <Text style={styles.detailValue}>{event.location || 'Sin lugar'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Notas:</Text>
              <Text style={styles.detailValue}>{event.notes || 'Sin notas'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Contacto:</Text>
              <Text style={styles.detailValue}>
                {isLoading ? 'Cargando...' : contactName}
              </Text>
            </View>
          </View>

          <Button onClick={handleScheduleReminder} style={styles.button}>
            <Text style={styles.buttonText}>Agendar Recordatorio</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6E6E6E',
    width: '40%',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    width: '60%',
    textAlign: 'right',
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});