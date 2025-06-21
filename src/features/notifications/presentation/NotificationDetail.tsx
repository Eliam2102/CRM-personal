import { View, Text, StyleSheet } from 'react-native';

export default function NotificationDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle para la notificacion esto es para verla mas a detalle</Text>
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