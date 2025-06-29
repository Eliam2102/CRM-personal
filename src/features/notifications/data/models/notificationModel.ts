export interface NotificationModel {
  id: string;               // ID que retorna Expo cuando se agenda
  title: string;            // Título que se mostrará en la notificación
  body: string;             // Cuerpo de la notificación
  triggerDate: Date;        // Cuándo debe mostrarse la notificación
  eventId?: string;         // Relación opcional al evento (para cancelar si se borra)
}