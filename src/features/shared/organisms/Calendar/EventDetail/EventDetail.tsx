import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import { useNavigation } from '@react-navigation/native';

interface EventDetailViewProps {
  eventId: string;
}

// Datos dummy para el ejemplo
const mockEventData = {
  id: '1',
  title: 'Reunión de Proyecto',
  date: '15 Noviembre 2023',
  time: '10:00 AM - 11:30 AM',
  location: 'Sala de Conferencias A',
  description: 'Revisión del avance del proyecto X con el equipo de desarrollo y stakeholders.',
  organizer: 'Juan Pérez',
};

export default function EventDetailView({ eventId }: EventDetailViewProps) {
  const navigation = useNavigation();

  const handleScheduleReminder = () => {
    Alert.alert(
      'Recordatorio Agendado',
      `Se ha creado un recordatorio para el evento "${mockEventData.title}"`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ProfileHeader 
          name={mockEventData.title} 
          imageUri={''} 
          onBack={handleBack} 
        />

        <View style={styles.content}>
          <View style={styles.detailCard}>
            <Text style={styles.sectionTitle}>Información del Evento</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fecha:</Text>
              <Text style={styles.detailValue}>{mockEventData.date}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hora:</Text>
              <Text style={styles.detailValue}>{mockEventData.time}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Lugar:</Text>
              <Text style={styles.detailValue}>{mockEventData.location}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Organizador:</Text>
              <Text style={styles.detailValue}>{mockEventData.organizer}</Text>
            </View>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>{mockEventData.description}</Text>
          </View>

          <Button 
            onClick={handleScheduleReminder}
            style={styles.button}
          >
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
    backgroundColor: '#F5F5F5', // gris claro
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
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF', // azul primario
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6E6E6E', // gris oscuro
    width: '40%',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333', // casi negro
    width: '60%',
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#007AFF', // azul primario
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});