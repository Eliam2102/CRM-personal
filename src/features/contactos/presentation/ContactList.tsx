import { View, Text, StyleSheet } from 'react-native';
import ContactList from '../../shared/organisms/Contact/ContactList/ContactList';

export default function ContactListScreen() {
  return (
    <View style={styles.container}>
      <ContactList/>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});