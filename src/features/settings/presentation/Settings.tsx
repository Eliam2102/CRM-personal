import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la vista que se va a generar para poder mostrar las configuracions</Text>
      <Text>Aqui va a ir los swtich para cambiar de oscuro a claro</Text>
      <Text>Algo como guardar prefrecnecnias y etc etc</Text>
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