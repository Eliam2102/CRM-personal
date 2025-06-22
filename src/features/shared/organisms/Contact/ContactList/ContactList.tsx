import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import ContactCard from '../../../molecules/Cards/ContactCard/ContactCard';
import { useNavigation } from "@react-navigation/native";
import { ContactStackNavigationProp } from '../../../../../navigation/Contact/types/types';

export default function ContactList() {
  const navigation = useNavigation<ContactStackNavigationProp>();

  const contacts = [
    { id: '1', name: 'Juan Pérez', imageUri: '' },
    { id: '2', name: 'Ana Gómez', imageUri: '' },
    { id: '3', name: 'Carlos Ramírez', imageUri: '' },
    { id: '4', name: 'Lucía Fernández', imageUri: '' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Lista de Contactos</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <ContactCard
            name={item.name}
            imageUri={item.imageUri}
            onPress={() => navigation.navigate('contactDetail', { id: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F2F5',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  separator: {
    height: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});