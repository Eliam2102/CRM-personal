import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";

//creación de la case para el useCase
export class GetEventByIdUseCase {
    //inyección del repo através del constructor
    constructor(private repository: CalendarRepository){}

    //METOOD PARA OBTENER UN EVENTO ATRAVÉS DEL ID
    async execute(id: string): Promise<CalendarEvent | null>{
        return this.repository.getEventById(id);
    }
}