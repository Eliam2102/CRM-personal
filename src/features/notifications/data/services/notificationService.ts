import * as Notifications from 'expo-notifications';
import { NotificationModel } from '../models/notificationModel';

export class NotificationService {
  private hasPermission = false;

  constructor() {
    this.configureNotificationHandler();
  }

  private configureNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }

  async init() {
    const granted = await this.requestPermissions();
    console.log('[NotificationService] Permisos de notificación:', granted);
    if (!granted) throw new Error('Permisos de notificación denegados');
    this.hasPermission = true;
  }

  async requestPermissions(): Promise<boolean> {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    }
    return true;
  }

  public async scheduleNotification(notification: Omit<NotificationModel, 'id'>): Promise<NotificationModel> {
    if (!this.hasPermission) {
      throw new Error('Notificación: permisos no concedidos o servicio no inicializado.');
    }

    console.log('[NotificationService] Programando notificación para:', notification.triggerDate.toLocaleString());
    console.log('[NotificationService] Datos:', notification);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          eventId: notification.eventId ?? null,
        },
      },
      trigger: {
        type: 'date',
        date: notification.triggerDate,
      },
    });

    console.log('[NotificationService] Notificación programada con ID:', notificationId);

    return {
      id: notificationId,
      title: notification.title,
      body: notification.body,
      triggerDate: notification.triggerDate,
      eventId: notification.eventId,
    };
  }

  public async cancelNotification(notificationId: string): Promise<void> {
    if (!this.hasPermission) return;
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  public async cancelAllNotifications(): Promise<void> {
    if (!this.hasPermission) return;
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  public async updateNotification(notification: NotificationModel): Promise<NotificationModel> {
    if (!this.hasPermission) throw new Error('Notificación: permisos no concedidos.');
    await this.cancelNotification(notification.id);
    return this.scheduleNotification({
      title: notification.title,
      body: notification.body,
      triggerDate: notification.triggerDate,
      eventId: notification.eventId,
    });
  }

  public async getPendingNotifications(): Promise<NotificationModel[]> {
    if (!this.hasPermission) return [];
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
   return scheduled.map(n => ({
      id: n.identifier,
      title: n.content.title ?? '',
      body: n.content.body ?? '',
      triggerDate: n.trigger?.type === 'date' && n.trigger.date ? new Date(n.trigger.date) : new Date(),
      eventId: typeof n.content.data?.eventId === 'string' ? n.content.data.eventId : undefined,
    }));
  }
}
