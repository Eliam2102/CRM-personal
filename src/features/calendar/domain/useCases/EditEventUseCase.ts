import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";



export class EditEventUseCase {
    //inyeccion del repo de 
    constructor(private repository: CalendarRepository){}

    //metodo para poder editar
    async execute(event: CalendarEvent): Promise<void>{
        return this.repository.updateEvent(event);
    }
}