import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigator';
import { CalendarService } from './src/features/calendar/data/services/CalendarService';

const calendarService = new CalendarService();

export default function App() {
  useEffect(() => {
    (async () => {
      await calendarService.init(); // ✅ se inicializa una sola vez al abrir la app
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