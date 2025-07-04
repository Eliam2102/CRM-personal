import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EventType } from '../../../features/shared/organisms/Calendar/CalendarPanel/types/types';
import { useNavigation } from '@react-navigation/native';
import { CalendarStackNavigationProp } from '../../../navigation/Calendar/types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  visible: boolean;
  events: EventType[];
  onClose: () => void;
}

export default function DayEventsModal({ visible, events, onClose }: Props) {
  const navigation = useNavigation<CalendarStackNavigationProp>();
  const now = new Date();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Eventos del día</Text>

          {events.map((event) => {
            const isPast = new Date(event.startDate) < now;

            return (
              <TouchableOpacity
                key={event.id}
                onPress={() => {
                    onClose();
                    navigation.navigate('eventDetail', { id: event.id });
                }}
                style={[
                    styles.eventItem,
                    isPast ? styles.pastEventItem : styles.activeEventItem,
                ]}
                >
                <View style={styles.eventRow}>
                    <FontAwesome
                    name={isPast ? 'check-circle' : 'clock-o'}
                    size={18}
                    color={isPast ? '#999' : '#007AFF'}
                    style={{ marginRight: 8 }}
                    />
                    <Text
                    style={[
                        styles.eventTitle,
                        isPast ? styles.pastEventTitle : styles.activeEventTitle,
                    ]}
                    >
                    {event.title}
                    </Text>
                </View>
                </TouchableOpacity>
            );
          })}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  eventItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activeEventItem: {
    backgroundColor: '#E8F4FF',
  },
  pastEventItem: {
    backgroundColor: '#F0F0F0',
  },
  eventTitle: {
    fontSize: 16,
  },
  activeEventTitle: {
    fontWeight: '600',
    color: '#007AFF',
  },
  pastEventTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
});