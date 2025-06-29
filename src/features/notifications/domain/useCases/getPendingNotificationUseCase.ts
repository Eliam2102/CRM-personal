import { Notification } from "../entities/notification";
import { NotificationRepository } from '../repository/notificationRepository';


export class GetPendingNotificationsUseCase {
  constructor(private repository: NotificationRepository) {}

  execute(): Promise<Notification[]> {
    return this.repository.getPendingNotifications();
  }
}