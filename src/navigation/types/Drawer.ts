//import importar el module
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackContactParamList } from "../Contact/types/types";
import { StackCalendarParamList } from "../Calendar/types/types";
//creacion del tipado ahora si
export type RootDrawerParamList = {
    //defino mis rutas principales en este caso deben ser las siguientes:
    index: undefined;
    contactsMain: { screen: keyof StackContactParamList; params?: StackContactParamList[keyof StackContactParamList]};
    calendarMain: { screen: keyof StackCalendarParamList; params?: StackCalendarParamList[keyof StackCalendarParamList]};
    notificationsMain: undefined;
    settingsMain: undefined;
}


//para exportarlo usamos primero el prefijo EXPORT TYPE 
//luego DrawerNavProp o el nombre que queramos darle 
// = Aqui luego igual, va el nombre del modulo que importamso
//y dentro de <> debe ir lo que creamos
export type DrawerNavProp = DrawerNavigationProp<RootDrawerParamList>;
