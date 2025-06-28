import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigator';
import { CalendarService } from './src/features/calendar/data/services/CalendarService';
import { ContactService } from './src/features/contactos/data/services/contactService';
import { NotificationService } from './src/features/notifications/data/services/notificationService';

const calendarService = new CalendarService();
const contactService = new ContactService();
const notificationService = new NotificationService();

export default function App() {
  useEffect(() => {
  (async () => {
    try {
      await calendarService.init();
      await notificationService.init();
    } catch (error) {
      console.warn('Error al inicializar servicios:', error);
    }
  })();
}, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}