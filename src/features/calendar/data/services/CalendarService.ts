import * as Calendar from 'expo-calendar';
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

    // Si ya existe calendarId, no lo vuelvas a crear
    if (!this.calendarId) {
      this.calendarId = await this.getOrCreateCalendarId();
      console.log('Calendario inicializado con id:', this.calendarId);
    }
  }

  /** Solicita permisos al usuario */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      return false;
    }
  }

  /** Busca un único calendario llamado "CRM Calendar" o lo crea */
  private async getOrCreateCalendarId(): Promise<string> {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

    // Filtrar por nombre único
    const existing = calendars.find(
      cal => cal.name === 'CRM Calendar' && cal.title === 'CRM Calendar'
    );

    if (existing) {
      console.log('📅Calendario encontrado con ID:', existing.id);
      return existing.id;
    }

    // Configura source correctamente
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

    // Crear nuevo calendario
    const newCalendarId = await Calendar.createCalendarAsync({
      title: 'CRM Calendar',
      name: 'CRM Calendar',
      color: '#2196f3',
      entityType: Calendar.EntityTypes.EVENT,
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      source,
      ownerAccount: 'personal',
      timeZone: 'UTC',
    });

    console.log('Calendario creado con ID:', newCalendarId);
    return newCalendarId;
  }

  /** Transforma el evento del sistema al modelo personalizado */
  private transformEvent(event: any): CalendarEventModel {
    return {
      id: event.id,
      title: event.title ?? 'Sin título',
      contactId: '', // Campo no proporcionado por expo-calendar
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      location: event.location ?? '',
      notes: event.notes ?? '',
      organizer: event.organizer ?? '',
      attendees: Array.isArray(event.attendees) ? event.attendees : [],
    };
  }

  /** Crea un evento */
  async createEvent(event: CalendarEventModel): Promise<string> {
    if (!this.calendarId) {
      await this.init();
      if (!this.calendarId) throw new Error('No se pudo obtener calendarId');
    }

    console.log(' Creando evento en calendarId:', this.calendarId);

    const eventId = await Calendar.createEventAsync(this.calendarId, {
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      notes: event.notes,
      timeZone: 'UTC',
    });

    console.log(' Evento creado con ID:', eventId);
    return eventId;
  }

  /** Obtiene eventos entre hoy y 1 año adelante */
  async getEvents(): Promise<CalendarEventModel[]> {
    if (!this.calendarId) {
      await this.init();
      if (!this.calendarId) {
        console.warn(' No hay calendarId disponible');
        return [];
      }
    }

    console.log('📥 Leyendo eventos desde calendarId:', this.calendarId);

   const now = new Date(2000, 0, 1);
   const future = new Date(2100, 11, 31);

    const events = await Calendar.getEventsAsync([this.calendarId], now, future);
    console.log(`📦 ${events.length} eventos obtenidos`);
    return events.map(this.transformEvent);
  }

  /** Obtiene un evento por ID */
  async getEventById(id: string): Promise<CalendarEventModel | null> {
    try {
      const event = await Calendar.getEventAsync(id);
      return this.transformEvent(event);
    } catch (error) {
      console.error('Error obteniendo evento por ID:', error);
      return null;
    }
  }

  /** Actualiza evento existente */
  async updateEvent(event: CalendarEventModel): Promise<void> {
    await Calendar.updateEventAsync(event.id, {
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      notes: event.notes,
      timeZone: 'UTC',
    });
    console.log(' Evento actualizado con ID:', event.id);
  }

  /** Elimina un evento por ID */
  async deleteEvent(eventId: string): Promise<void> {
    await Calendar.deleteEventAsync(eventId);
    console.log(' Evento eliminado con ID:', eventId);
  }

  /** Método para depuración: lista todos los calendarios y eventos */
  async debugCalendarsAndEvents(): Promise<void> {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    console.log('Lista de calendarios:');

    for (const calendar of calendars) {
      console.log(`📘 ${calendar.title} (ID: ${calendar.id})`);

      try {
        const now = new Date();
        const future = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        const events = await Calendar.getEventsAsync([calendar.id], now, future);

        console.log(`   → ${events.length} eventos`);
        for (const e of events) {
          console.log(`     • ${e.title} | ${new Date(e.startDate).toLocaleString()} - ${new Date(e.endDate).toLocaleString()}`);
        }
      } catch (error) {
        console.warn('Error leyendo eventos para calendario:', calendar.id, error);
      }
    }
  }
}