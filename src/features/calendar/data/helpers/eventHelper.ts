import { CalendarEventModel } from '../models/CalendarModel';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('calendar_events.db');

// Función para parsear eventos de forma segura
const parseEventFromDB = (event: any): CalendarEventModel => {
  // Manejo seguro de attendees
  let attendees = [];
  try {
    if (event.attendees && typeof event.attendees === 'string') {
      attendees = JSON.parse(event.attendees);
      if (!Array.isArray(attendees)) {
        attendees = [];
      }
    }
  } catch (e) {
    console.warn('Error parsing attendees for event', event.id, e);
    attendees = [];
  }

  // Manejo seguro de fechas
  let startDate = new Date();
  let endDate = new Date();
  try {
    startDate = new Date(event.startDate);
    endDate = new Date(event.endDate);
  } catch (e) {
    console.warn('Error parsing dates for event', event.id, e);
  }

  return {
    id: event.id,
    title: event.title,
    startDate,
    endDate,
    location: event.location || '',
    notes: event.notes || '',
    organizer: event.organizer || '',
    contactId: event.contactId || undefined,
    attendees
  };
};

export async function setupDatabase(): Promise<void> {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        location TEXT,
        notes TEXT,
        organizer TEXT,
        attendees TEXT,
        contactId TEXT
      );
    `);
    console.log('Base de datos de eventos lista');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

export async function insertEvent(event: CalendarEventModel): Promise<void> {
  try {
    await db.runAsync(
      `INSERT INTO events (
        id, title, startDate, endDate, location, notes, organizer, attendees, contactId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.id,
        event.title,
        event.startDate instanceof Date ? event.startDate.toISOString() : new Date().toISOString(),
        event.endDate instanceof Date ? event.endDate.toISOString() : new Date().toISOString(),
        event.location || null,
        event.notes || null,
        event.organizer || null,
        JSON.stringify(event.attendees || []),
        event.contactId || null
      ]
    );
    console.log('Evento insertado en SQLite');
  } catch (error) {
    console.error('Error al insertar evento en SQLite:', error);
    throw error;
  }
}

export async function getAllEventsFromDB(): Promise<CalendarEventModel[]> {
  try {
    const result = await db.getAllAsync(`SELECT * FROM events`);
    return result.map(parseEventFromDB);
  } catch (error) {
    console.error('Error al obtener eventos de SQLite:', error);
    return [];
  }
}

export async function getEventByIdFromDB(id: string): Promise<CalendarEventModel | null> {
  try {
    // Cambiamos getAsync por getFirstAsync
    const result = await db.getFirstAsync(
      `SELECT * FROM events WHERE id = ?`,
      [id]
    );
    
    if (!result) return null;
    return parseEventFromDB(result);
  } catch (error) {
    console.error('Error al obtener evento por ID de SQLite:', error);
    return null;
  }
}

export async function updateEventInDB(event: CalendarEventModel): Promise<void> {
  try {
    await db.runAsync(
      `UPDATE events SET
        title = ?,
        startDate = ?,
        endDate = ?,
        location = ?,
        notes = ?,
        organizer = ?,
        attendees = ?,
        contactId = ?
      WHERE id = ?`,
      [
        event.title,
        event.startDate.toISOString(),
        event.endDate.toISOString(),
        event.location || null,
        event.notes || null,
        event.organizer || null,
        JSON.stringify(event.attendees || []),
        event.contactId || null,
        event.id
      ]
    );
    console.log('Evento actualizado en SQLite');
  } catch (error) {
    console.error('Error al actualizar evento en SQLite:', error);
    throw error;
  }
}

export async function deleteEventFromDB(id: string): Promise<void> {
  try {
    await db.runAsync(`DELETE FROM events WHERE id = ?`, [id]);
    console.log('Evento eliminado de SQLite');
  } catch (error) {
    console.error('Error al eliminar evento de SQLite:', error);
    throw error;
  }
}

export async function getEventsByContactId(contactId: string): Promise<CalendarEventModel[]> {
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM events WHERE contactId = ?`,
      [contactId]
    );
    return result.map(parseEventFromDB);
  } catch (error) {
    console.error('Error al obtener eventos por contactId:', error);
    return [];
  }
}