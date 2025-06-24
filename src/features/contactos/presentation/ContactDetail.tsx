import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackContactParamList } from '../../../navigation/Contact/types/types';
import ContactDetailView from '../../shared/organisms/Contact/ContactDetail/ContactDetail';
import { ContactViewModel } from './viewmodel/ContactViewModel';

type ContactDetailRouteProp = RouteProp<StackContactParamList , 'contactDetail'>;

export default function ContactDetailScreen() {
  const route = useRoute<ContactDetailRouteProp>();
  const { id } = route.params;

  const {
    fetchContactById,
    selectedContact,
    isLoading,
    error,
  } = ContactViewModel();

  // Consultar el contacto al cargar la pantalla
  useEffect(() => {
    fetchContactById(id);
  }, [id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!selectedContact) {
    return <Text style={styles.errorText}>Contacto no encontrado.</Text>;
  }

  return (
    <View style={styles.container}>
      <ContactDetailView contact={selectedContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'red',
  },
});