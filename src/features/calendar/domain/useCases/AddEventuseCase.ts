import { CalendarEvent } from "../entities/event";
import { CalendarRepository } from "../repository/CalendarRepository";


//Creación de la clase
export class AddEventUseCase {
    //inyectamos el repo atraves del constructor
    constructor(private repository: CalendarRepository){}

    //metood para poder crear un evento
    async execute(event: CalendarEvent): Promise<void>{
        return this.repository.createEvent(event);
    }
}