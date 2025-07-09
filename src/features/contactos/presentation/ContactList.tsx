import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ContactList from '../../shared/organisms/Contact/ContactList/ContactList';
import { ContactViewModel } from './viewmodel/ContactViewModel';
import ContactModal from '../../../common/components/modals/ModalContact';
import { Contact } from '../domain/entities/contact';
import { useTheme } from '../../../common/hooks/theme';

export default function ContactListScreen() {
  const {
    contacts,
    isLoading,
    createContact,
    updateContact,
    fetchContacts,
    searchContacts,
  } = ContactViewModel();

  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // cuando se escriba en el input
  const handleSearchInput = (text: string) => {
    setSearchQuery(text);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (text.trim() === '') {
        setFilteredContacts(contacts); // restaurar si vacío
      } else {
        const results = await searchContacts(text.trim());
        setFilteredContacts(results);
      }
    }, 300);
  };

  const handleSubmit = async (contact: Contact) => {
    if (contact.id) {
      await updateContact(contact);
    } else {
      await createContact(contact);
    }
    await fetchContacts();
  };

  useFocusEffect(
    useCallback(() => {
      fetchContacts().then(() => {
        setFilteredContacts(contacts);
      });
    }, [])
  );

  useEffect(() => {
    setFilteredContacts(contacts); // sincronizar si cambian
  }, [contacts]);

  if (isLoading && contacts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o número"
        value={searchQuery}
        onChangeText={handleSearchInput}
      />

      <Button title="Nuevo Contacto" onPress={() => setModalVisible(true)} />

      <ContactList contacts={filteredContacts} />

      <ContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
});
