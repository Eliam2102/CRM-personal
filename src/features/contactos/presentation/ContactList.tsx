import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ContactList from '../../shared/organisms/Contact/ContactList/ContactList';
import { ContactViewModel } from './viewmodel/ContactViewModel';
import ContactModal from '../../../common/components/modals/ModalContact';
import { Contact } from '../domain/entities/contact';

export default function ContactListScreen() {
  const {
    contacts,
    isLoading,
    error,
    createContact,
    updateContact,
    fetchContacts,
  } = ContactViewModel();

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (contact: Contact) => {
    if (contact.id) {
      await updateContact(contact);
    } else {
      await createContact(contact);
    }
    fetchContacts();
  };

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Nuevo Contacto" onPress={() => setModalVisible(true)} />
      <ContactList contacts={contacts} />
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
});
