import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackCalendarParamList = {
    calendar: undefined;
    eventDetail: { id: string }; //el string se pone dentro de parentsis para espefiicar uqe se recibe ese parametro
}

//export el tipo especifio de navegación
export type CalendarStackNavigationProp = NativeStackNavigationProp<StackCalendarParamList>;