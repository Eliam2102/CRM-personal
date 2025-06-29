export interface Notification {
  id: string;
  title: string;
  body: string;
  triggerDate: Date;
  eventId?: string;
}