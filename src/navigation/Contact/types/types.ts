import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type StackContactParamList = {
    contacts: undefined;
    contactDetail: { id: string };
};

//export el tipo especifio de navegación
export type ContactStackNavigationProp = NativeStackNavigationProp<StackContactParamList>;