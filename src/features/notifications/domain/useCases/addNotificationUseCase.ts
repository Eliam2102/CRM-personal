import { Notification } from "../entities/notification";
import { NotificationRepository } from '../repository/notificationRepository';

export class ScheduleNotificationUseCase {
  constructor(private repository: NotificationRepository) {}

  execute(notification: Omit<Notification, 'id'>): Promise<Notification> {
    return this.repository.scheduleNotification(notification);
  }
}