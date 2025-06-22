import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type StackNotificationsParamsList = {
    notifications: undefined;
    notificationDetail: { id: string }; //el string se pone dentro de parentsis para espefiicar uqe se recibe ese parametro
}

//export el tipo especifio de navegación
export type NotificationStackNavigationProp = NativeStackNavigationProp<StackNotificationsParamsList>;