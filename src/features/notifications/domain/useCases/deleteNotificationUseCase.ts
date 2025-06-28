import { Notification } from "../entities/notification";
import { NotificationRepository } from '../repository/notificationRepository';


export class CancelNotificationUseCase {
  constructor(private repository: NotificationRepository) {}

  execute(notificationId: string): Promise<void> {
    return this.repository.cancelNotification(notificationId);
  }
}
