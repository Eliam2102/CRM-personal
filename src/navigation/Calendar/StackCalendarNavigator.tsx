//para crear un stack a diferencia del drawer se usa este
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackCalendarParamList } from "./types/types";
import CalendarScreen from "../../features/calendar/presentation/Calendar";
import EventDetailScreen from "../../features/calendar/presentation/EventDetail";

const Stack = createNativeStackNavigator<StackCalendarParamList>();



export default function CalendarStackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="calendar"
    screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen name="calendar" component={CalendarScreen} />
      <Stack.Screen name="eventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
}