//importar el evetno para aber uqe debe contener
import { CalendarEvent } from '../entities/event';
//importar el repositorio para acceder al metodo
import { CalendarRepository } from '../repository/CalendarRepository';


//la creacion del useCase es creación deun a clase
export class GetAllEventsUseCase {
    //ineyectar el repositorio através del constructor
    constructor ( private repository: CalendarRepository){}

    //CREAMOS EL METODO PRA PODER OBTENER
    async execute(): Promise<CalendarEvent[]>{
        return this.repository.getEvents();
    }
}