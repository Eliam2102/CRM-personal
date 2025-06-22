import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from '../../shared/organisms/Dashboard/Dashboard';

export default function HomeScreen() {
  // Datos de prueba
  const dummyContacts = [
    { name: 'Juan Pérez', imageUri: '', onPress: () => console.log('Ver Juan Pérez') },
    { name: 'Ana Gómez', imageUri: '', onPress: () => console.log('Ver Ana Gómez') },
  ];

  const dummyEvents = [
    { title: 'Cumpleaños Carlos', date: '21 Jun', onPress: () => console.log('Ver evento Carlos') },
    { title: 'Reunión Proyecto', date: '25 Jun', onPress: () => console.log('Ver reunión') },
  ];

  const dummyNotifications = [
    { message: 'Llamar a Laura', onPress: () => console.log('Ver notificación Laura') },
    { message: 'Enviar correo a Pedro', onPress: () => console.log('Ver notificación Pedro') },
  ];

  return (
    <View style={styles.container}>
      <Dashboard
        contacts={dummyContacts}
        events={dummyEvents}
        notifications={dummyNotifications}
        onNavigateContacts={() => console.log('Ir a Contactos')}
        onNavigateCalendar={() => console.log('Ir a Calendario')}
        onNavigateNotifications={() => console.log('Ir a Notificaciones')}
        onNavigateSettings={() => console.log('Ir a Configuración')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});