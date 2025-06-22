import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ContactList from '../../shared/organisms/Contact/ContactList/ContactList';
import { ContactViewModel } from './viewmodel/ContactViewModel';

export default function ContactListScreen() {
  const {
    contacts,
    isLoading,
    error,
    fetchContacts,
  } = ContactViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ContactList contacts={contacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});