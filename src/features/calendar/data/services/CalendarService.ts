import * as Calendar from 'expo-calendar';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { CalendarEventModel } from '../models/CalendarModel';

export class CalendarService {
  private calendarId: string | null = null;

  constructor() {}

  /** Inicializa permisos y obtiene o crea un calendario único */
  public async init() {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      console.warn('Permisos para calendario denegados');
      return;
    }

    if (!this.calendarId) {
      this.calendarId = await this.getOrCreateCalendarId();
      console.log('Calendario inicializado con id:', this.calendarId);
    }
  }

  /** Solicita permisos al usuario para calendario */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      return false;
    }
  }

  /** Busca o crea un único calendario llamado "CRM Calendar" */
  private async getOrCreateCalendarId(): Promise<string> {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const existing = calendars.find(
      cal => cal.name === 'CRM Calendar' && cal.title === 'CRM Calendar'
    );

    if (existing) return existing.id;

    let source: Calendar.Source;
    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      source = defaultCalendar.source;
    } else {
      source = {
        name: 'Expo Calendar',
        isLocalAccount: true,
        type: Calendar.SourceType.LOCAL,
      };
    }

    return await Calendar.createCalendarAsync({
      title: 'CRM Calendar',
      name: 'CRM Calendar',
      color: '#2196f3',
      entityType: Calendar.EntityTypes.EVENT,
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      source,
      ownerAccount: 'personal',
      timeZone: 'UTC',
    });
  }

  /** Transforma evento nativo a modelo personalizado */
  private transformEvent(event: any): CalendarEventModel {
    let parsedNotes = { contactId: '', description: '', notificationId: '' };

    try {
      parsedNotes = JSON.parse(event.notes);
    } catch {
      parsedNotes.description = event.notes ?? '';
    }

    return {
      id: event.id,
      title: event.title ?? 'Sin título',
      contactId: parsedNotes.contactId ?? '',
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      location: event.location ?? '',
      notes: parsedNotes.description ?? '',
      organizer: event.organizer ?? '',
      attendees: Array.isArray(event.attendees) ? event.attendees : [],
      notificationId: parsedNotes.notificationId,
    };
  }

  /** Crea un evento de calendario y una notificación programada asociada */
  async createEvent(event: CalendarEventModel): Promise<{ eventId: string; notificationId: string }> {
    if (!this.calendarId) {
      await this.init();
      if (!this.calendarId) throw new Error('No se pudo obtener calendarId');
    }

    // Programar notificación 10 minutos antes
    const trigger = new Date(event.startDate.getTime() - 10 * 60 * 1000);
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: event.title,
        body: event.notes,
        sound: 'default',
      },
      trigger,
    });

    console.log('Notificación programada con ID:', notificationId);

    // Crear evento de calendario con notificationId en notes
    const eventId = await Calendar.createEventAsync(this.calendarId, {
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      notes: JSON.stringify({
        contactId: event.contactId,
        description: event.notes,
        notificationId: event.notificationId,
      }),
      timeZone: 'UTC',
    });

    console.log('Evento creado con ID:', eventId);
    return { eventId, notificationId };
  }

  /** Obtiene todos los eventos del calendario */
  async getEvents(): Promise<CalendarEventModel[]> {
    if (!this.calendarId) {
      await this.init();
      if (!this.calendarId) return [];
    }

    const now = new Date(2000, 0, 1);
    const future = new Date(2100, 11, 31);

    const events = await Calendar.getEventsAsync([this.calendarId], now, future);
    return events.map(this.transformEvent);
  }

  /** Obtiene evento por su ID */
  async getEventById(id: string): Promise<CalendarEventModel | null> {
    try {
      const event = await Calendar.getEventAsync(id);
      return this.transformEvent(event);
    } catch (error) {
      console.error('Error obteniendo evento por ID:', error);
      return null;
    }
  }

  /** Actualiza evento existente, reprograma notificación */
  async updateEvent(event: CalendarEventModel): Promise<string> {
    // Cancelar notificación anterior
    if (event.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(event.notificationId);
      console.log('Notificación cancelada:', event.notificationId);
    }

    // Programar nueva notificación
    const trigger = new Date(event.startDate.getTime() - 10 * 60 * 1000);
    const newNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: event.title,
        body: event.notes,
        sound: 'default',
      },
      trigger,
    });

    console.log('Nueva notificación programada:', newNotificationId);

    // Actualizar evento en calendario
    await Calendar.updateEventAsync(event.id, {
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      notes: JSON.stringify({
        contactId: event.contactId,
        description: event.notes,
        notificationId: newNotificationId,
      }),
      timeZone: 'UTC',
    });

    console.log(' Evento actualizado:', event.id);
    return newNotificationId;
  }

  /** Elimina evento por ID y cancela su notificación */
  async deleteEvent(eventId: string): Promise<void> {
    const event = await this.getEventById(eventId);
    if (event?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(event.notificationId);
      console.log('Notificación cancelada:', event.notificationId);
    }

    await Calendar.deleteEventAsync(eventId);
    console.log('Evento eliminado:', eventId);
  }

  /** Depuración: lista todos los calendarios y sus eventos */
  async debugCalendarsAndEvents(): Promise<void> {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    console.log('Lista de calendarios:');

    for (const calendar of calendars) {
      console.log(`${calendar.title} (ID: ${calendar.id})`);

      const now = new Date();
      const future = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

      try {
        const events = await Calendar.getEventsAsync([calendar.id], now, future);
        console.log(`   → ${events.length} eventos`);
        for (const e of events) {
          console.log(`     • ${e.title} | ${new Date(e.startDate).toLocaleString()}`);
        }
      } catch (error) {
        console.warn('Error leyendo eventos de calendario:', calendar.id, error);
      }
    }
  }
}
