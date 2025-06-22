import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import ContactCard from '../../../molecules/Cards/ContactCard/ContactCard';
import { useNavigation } from "@react-navigation/native";
import { ContactStackNavigationProp } from '../../../../../navigation/Contact/types/types';

export default function ContactList() {
    //funficonto para navegar y tipar
    const navigation = useNavigation<ContactStackNavigationProp>();
  // Lista dummy de contactos solo es para probar mientras
  const contacts = [
    { id: '1',name: 'Juan Pérez', imageUri: ''},
    { id: '2',name:'Ana Gómez', imageUri: ''}, 
    { id: '3',name: 'Carlos Ramírez', imageUri: '' },
    { id: '4',name: 'Lucía Fernández', imageUri: ''},
  ];

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  separator: {
    height: 12,
  },
});