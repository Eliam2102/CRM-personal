//para crear un stack a diferencia del drawer se usa este
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNotificationsParamsList } from "./types/types";
import NotificationListScreen from "../../features/notifications/presentation/NotificationList";
import NotificationDetailScreen from "../../features/notifications/presentation/NotificationDetail";

const Stack = createNativeStackNavigator<StackNotificationsParamsList>();



export default function NotificationStackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="notifications"
    screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen name="notifications" component={NotificationListScreen} />
      <Stack.Screen name="notificationDetail" component={ NotificationDetailScreen} />
    </Stack.Navigator>
  );
}