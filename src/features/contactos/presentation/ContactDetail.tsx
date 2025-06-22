import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackContactParamList } from '../../../navigation/Contact/types/types';
import ContactDetailView from '../../shared/organisms/Contact/ContactDetail/ContactDetail';

type ContactDetailRouteProp = RouteProp<StackContactParamList , 'contactDetail'>;

export default function ContactDetailScreen() {
  const route = useRoute<ContactDetailRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <ContactDetailView contactId={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});