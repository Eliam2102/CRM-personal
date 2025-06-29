import { NotificationRepository } from '../../domain/repository/notificationRepository';
import { Notification } from '../../domain/entities/notification';
import { NotificationService } from '../services/notificationService';
import { NotificationModel } from '../models/notificationModel';

export class NotificationRepositoryImpl implements NotificationRepository {
  private service: NotificationService;

  constructor() {
    this.service = new NotificationService();
  }

  async scheduleNotification(notification: Omit<Notification, 'id'>): Promise<Notification> {
    const model: Omit<NotificationModel, 'id'> = {
      title: notification.title,
      body: notification.body,
      triggerDate: notification.triggerDate,
      eventId: notification.eventId,
    };

    const result = await this.service.scheduleNotification(model);

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      triggerDate: result.triggerDate,
      eventId: result.eventId,
    };
  }

  async cancelNotification(notificationId: string): Promise<void> {
    await this.service.cancelNotification(notificationId);
  }

  async updateNotification(notification: Notification): Promise<Notification> {
    const result = await this.service.updateNotification({
      id: notification.id,
      title: notification.title,
      body: notification.body,
      triggerDate: notification.triggerDate,
      eventId: notification.eventId,
    });

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      triggerDate: result.triggerDate,
      eventId: result.eventId,
    };
  }

  async getPendingNotifications(): Promise<Notification[]> {
    const result = await this.service.getPendingNotifications();
    return result.map(n => ({
      id: n.id,
      title: n.title,
      body: n.body,
      triggerDate: n.triggerDate,
      eventId: n.eventId,
    }));
  }
}