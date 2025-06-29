import { CalendarEvent } from "../entities/event";

//creación de. la interface
//básicamente representa el contrato qeu la capa de data debe de serguir
//lo relacionamons con la implemntación de repositorios donde usamo stmabién lo servicios
export interface CalendarRepository {
  //obtener todos los eventos
  getEvents(): Promise<CalendarEvent[]>;
  //obteneer un evento através de su ID
  getEventById(id: string): Promise<CalendarEvent | null>;
  //crear un evento
  createEvent(event: CalendarEvent): Promise<string>;
  //actualizar un evetno
  updateEvent(event: CalendarEvent): Promise<void>;
  //borrar el evento con su id
  deleteEvent(id: string): Promise<void>;
}