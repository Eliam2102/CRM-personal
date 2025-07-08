export interface DashboardProps {
  contacts: {
    id: any; name: string; imageUri?: string; onPress: () => void 
}[];
  events: { title: string; date: string; onPress: () => void }[];
  totalContacts: number;
  totalEventsToday: number;
  notifications: { message: string; onPress: () => void }[];
  onNavigateContacts: () => void;
  onNavigateCalendar: () => void;
  onNavigateNotifications: () => void;
  onNavigateSettings: () => void;
}