import { View, Text, StyleSheet } from 'react-native';

//creación del componente através de una funcion JSX 
export default function EventDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vista genérica para probar Stack</Text>
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