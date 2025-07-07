import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert} from 'react-native';
import Text from '../../../atoms/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Contact } from '../../../../contactos/domain/entities/contact';
import ContactModal from '../../../../../common/components/modals/ModalContact';
import { ContactViewModel } from '../../../../contactos/presentation/viewmodel/ContactViewModel';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';

interface Props {
  contact: Contact;
  onRefresh: () => void;
}

export default function ContactDetailView({ contact, onRefresh }: Props) {
  const navigation = useNavigation();
  const { updateContact, deleteContact } = ContactViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdate = async (updated: Contact) => {
    await updateContact(updated);
    await onRefresh();
    setModalVisible(false);
  };

const handleDelete = () => {
  console.log('Eliminar contacto con id:', contact.id);
  Alert.alert(
    'Eliminar contacto',
    '¿Estás seguro que deseas eliminar este contacto?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await deleteContact(contact.id);
          await onRefresh();
          navigation.goBack();
        },
      },
    ]
  );
};


  const priorityColors: Record<string, string> = {
    alta: '#FF4D4D',
    media: '#FFA500',
    baja: '#4CAF50',
    ninguna: '#BDBDBD',
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#007AFF" />
        </Pressable>

        <View style={{ flex: 1 }} /> 

        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={26} color="#FF3B30" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarContainer}>
          <ProfileHeader name={contact.name} style={styles.avatar} />
          <Text style={styles.name}>{contact.name}</Text>
        </View>

        <View style={styles.card}>
          <Detail label="Primer Nombre" value={contact.firstName} />
          <Detail label="Apellido" value={contact.lastName} />
          <Detail
            label="Tipo de Contacto"
            value={contact.contactType === 'company' ? 'Empresa' : 'Persona'}
          />

          <Text style={styles.label}>Prioridad</Text>
          <View style={[styles.chip, { backgroundColor: priorityColors[contact.priority] }]}>
            <Text style={styles.chipText}>{contact.priority.toUpperCase()}</Text>
          </View>

          {contact.phoneNumbers?.length > 0 && (
            <>
              <Text style={styles.label}>Teléfonos</Text>
              {contact.phoneNumbers.map((p, index) => (
                <Text key={index} style={styles.detailText}>
                 <Text>{p.number}</Text>
                </Text>
              ))}
            </>
          )}
        </View>

        <Pressable style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={20} color="#FFF" />
          <Text style={styles.editButtonText}>Editar Contacto</Text>
        </Pressable>
      </ScrollView>

      <ContactModal
        visible={modalVisible}
        contactToEdit={contact}
        onSubmit={handleUpdate}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.detailText}>{value || 'No disponible'}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
  },
  scroll: {
    padding: 20,
    gap: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E0E0E0',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },
  detailText: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 6,
  },
  chipText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
