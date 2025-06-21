//para crear un stack a diferencia del drawer se usa este
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//y aqui importamos el tipado de rutas qeu definimos antes
import { StackParamList } from "./types/Stack";

//región para importar las pantallas de la cpa de presentación de cada feature
//pantlalas de calendarios
import CalendarScreen from "../features/calendar/presentation/Calendar";
import EventDetailScreen from "../features/calendar/presentation/EventDetail";
//pantallas de contactos
import ContactListScreen from "../features/contactos/presentation/ContactList";
import ContactDetailScreen from "../features/contactos/presentation/ContactDetail";
//pantallas de notifiaciones
import NotificationDetailScreen from "../features/notifications/presentation/NotificationDetail";
import NotificationListScreen from "../features/notifications/presentation/NotificationList";
//pantallas de configuración
//home esta dentro de configuración porque es parte  de los acciones   que dan cambio a la app
import HomeScreen from "../features/settings/presentation/Home";
import SettingsScreen from "../features/settings/presentation/Settings";
//final de la región pra importar las pantallas



//INSTANCIA del metodo para crear un stack y lo mismo lo tipamos con su respectivo tipado de rutas
const Stack = createNativeStackNavigator<StackParamList>();



export default function StackNavigation (){
    return(
        <Stack.Navigator
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
        >
            {/* //aqui van las pantallas del stack */}
            <Stack.Screen name="index" component={HomeScreen} />
            <Stack.Screen name="contacts" component={ContactListScreen}/>
            <Stack.Screen name="calendar" component={CalendarScreen}/>
            <Stack.Screen name="notifications" component={NotificationListScreen}/>
            <Stack.Screen name="settings" component={SettingsScreen}/>
        </Stack.Navigator>
    )
}