//entidad de la capa de dominio, es de una manera mas sencilla que el modelo
export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  notes?: string;
}