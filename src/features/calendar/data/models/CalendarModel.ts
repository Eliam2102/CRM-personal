//creación del modelo
//dicho representa la manera pura con la que me responde
export interface CalendarEventModel {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  notes?: string;
}