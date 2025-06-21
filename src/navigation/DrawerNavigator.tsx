import React from "react";
import { StyleSheet, ViewStyle,  } from "react-native";
//este modulo se importa es importante ponerlo para crear un drawer con react navigation ( navegación avanzada)
import { createDrawerNavigator } from "@react-navigation/drawer";
//el tipado de rutas es importante importarlo para usarlo esto dependera del que uses
import { RootDrawerParamList } from "./types/Drawer";

//modulod e font awesome para los icones 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//no sobrepase el notch la pantalla
import { SafeAreaView } from "react-native-safe-area-context";

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


//instnaciar el metodo createDrawwer en una constante para usarlo de manera mas sencilla y tiparlo con nuestro tipado de rutas.
const Drawer = createDrawerNavigator<RootDrawerParamList>();

//creamos el compoentne através de una función JSX
export default function DrawerNavigation() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* //usamos lo que instanciamos por fuer auqe es DRwer para crear yponemos .Navigator y cerramos */}
        <Drawer.Navigator
            //esta se usa para poner la ruta que se va amostrar cunado se inicie la APP
            initialRouteName="index"
            //se usa esto siemrpe para poder configurar el drawer o darle estilos
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#BDE0FE', //este color es del header
                },
                headerStatusBarHeight: 0, //no se vea muy ancho el header
                headerTintColor: '#333333', //este color es para la letras del header
                drawerStyle: {
                    backgroundColor: '#FFFFFF',  //color de la pestañan de las opciones del drawer
                },
                drawerActiveTintColor: '#0077B6', //cuando estas posicionado en una ruta y coincide con la del drawer se marca
                drawerInactiveTintColor: '#8E8E8E', //estos son los normales, los uqe no estan en uso 
                drawerLabelStyle: {
                    fontWeight: 'bold', //peso de la fuente 'bold' es como negritas un poco mas gruesa
                    fontSize: 16, //tanaño de la fuente 
                },
            }}
        >
            <Drawer.Screen
                name="index"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="contacts"
                component={ContactListScreen}
                options={{
                    title: 'Contactos',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="address-book" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="calendar"
                component={CalendarScreen}
                options={{
                    title: 'Calendario',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="calendar-alt" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="notifications"
                component={NotificationListScreen}
                options={{
                    title: 'Notificaciones',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="bell" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="settings"
                component={SettingsScreen}
                options={{
                    title: 'Configuraciones',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="cog" color={color} size={size} />
                    ),
                }}
            />
            
        </Drawer.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF' // Mismo color que tu drawer
    }
});