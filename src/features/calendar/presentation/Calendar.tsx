import { View, Text, StyleSheet } from 'react-native';
import CalendarPanel from '../../shared/organisms/Calendar/CalendarPanel/CalendarPanel';


export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <CalendarPanel/>
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