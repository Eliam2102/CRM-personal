//import importar el module
import { DrawerNavigationProp } from "@react-navigation/drawer";

//creacion del tipado ahora si
export type RootDrawerParamList = {
    //defino mis rutas principales en este caso deben ser las siguientes:
    index: undefined;
    contacts: undefined;
    calendar: undefined;
    notifications: undefined;
    settings: undefined;
    contactDetail: { id: string }; //el string se pone dentro de parentsis para espefiicar uqe se recibe ese parametro ,que es el id y se poene que string por qeu peude ser numero sy letras 
    eventDetail: { id: string }; //el string se pone dentro de parentsis para espefiicar uqe se recibe ese parametro
    notificationDetail: { id: string }; //el string se pone dentro de parentsis para espefiicar uqe se recibe ese parametro
}


//para exportarlo usamos primero el prefijo EXPORT TYPE 
//luego DrawerNavProp o el nombre que queramos darle 
// = Aqui luego igual, va el nombre del modulo que importamso
//y dentro de <> debe ir lo que creamos
export type DrawerNavProp = DrawerNavigationProp<RootDrawerParamList>;
