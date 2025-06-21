import { View, Text, StyleSheet } from 'react-native';

export default function ContactListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui se mostrara completamente toda la lista de contactos</Text>
      <Text>QUE SE VAN A OBTNEER DE LA API NATIVA DE EXPO-CONTCTS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});