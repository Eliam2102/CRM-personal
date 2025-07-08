import React from 'react';
import { Modal, View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { Contact } from '../../../features/contactos/domain/entities/contact';
import ContactCard from '../../../features/shared/molecules/Cards/ContactCard/ContactCard';
import { useNavigation } from '@react-navigation/native';
import { ContactStackNavigationProp } from '../../../navigation/Contact/types/types';

interface Props {
  visible: boolean;
  contacts: Contact[];
  onClose: () => void;
}

export default function SearchResultsModal({ visible, contacts, onClose }: Props) {
  const navigation = useNavigation<ContactStackNavigationProp>();

  const handlePress = (id: string) => {
    onClose();
    navigation.navigate('contactDetail', { id });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Resultados de búsqueda</Text>

        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard
              name={item.name}
              imageUri={item.imageUri}
              onPress={() => handlePress(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Cerrar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
