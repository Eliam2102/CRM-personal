// data/repository_impl/EventRepositoryImpl.ts
import { CalendarRepository } from "../../domain/repository/CalendarRepository";
import { CalendarEventModel } from "../models/CalendarModel";
import { CalendarService } from "../services/CalendarService";


export class EventRepositoryImpl implements CalendarRepository {
  private service = new CalendarService();

  async getEvents(): Promise<CalendarEventModel[]> {
    return await this.service.getEvents();
  }

  async getEventById(id: string): Promise<CalendarEventModel | null> {
    return await this.service.getEventById(id);
  }

  async createEvent(event: CalendarEventModel): Promise<string> {
    return await this.service.createEvent(event);
  }


  async updateEvent(event: CalendarEventModel): Promise<void> {
    await this.service.updateEvent(event);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.service.deleteEvent(id);
  }
}