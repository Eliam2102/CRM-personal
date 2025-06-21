import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
    index: undefined;
    contacts: undefined;
    calendar: undefined;
    notifications: undefined;
    settings: undefined;
    contactDetail: { id: string };
    eventDetail: { id: string }; 
    notificationDetail: { id: string }; 
};

export type StackNavProp = NativeStackNavigationProp<StackParamList>;