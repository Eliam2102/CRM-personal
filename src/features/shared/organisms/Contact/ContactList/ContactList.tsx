import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import ContactCard from '../../../molecules/Cards/ContactCard/ContactCard';
import { useNavigation } from "@react-navigation/native";
import { ContactStackNavigationProp } from '../../../../../navigation/Contact/types/types';
import { Contact } from '../../../../contactos/domain/entities/contact';

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  const navigation = useNavigation<ContactStackNavigationProp>();

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