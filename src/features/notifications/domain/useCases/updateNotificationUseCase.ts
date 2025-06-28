import { Notification } from "../entities/notification";
import { NotificationRepository } from '../repository/notificationRepository';


export class UpdateNotificationUseCase {
  constructor(private repository: NotificationRepository) {}

  execute(notification: Notification): Promise<Notification> {
    return this.repository.updateNotification(notification);
  }
}