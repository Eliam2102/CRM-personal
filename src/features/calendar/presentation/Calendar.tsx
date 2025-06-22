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