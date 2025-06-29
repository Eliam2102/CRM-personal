import { Notification } from '../entities/notification';

export interface NotificationRepository {
  scheduleNotification(notification: Omit<Notification, 'id'>): Promise<Notification>;
  cancelNotification(notificationId: string): Promise<void>;
  updateNotification(notification: Notification): Promise<Notification>;
  getPendingNotifications(): Promise<Notification[]>;
}