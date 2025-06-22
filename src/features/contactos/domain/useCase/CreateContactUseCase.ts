import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class CreateContactsUseCase {
    //inyeccion del repositorio através del constructoor
    //es private para uqe solo através de el se pueda accceder a dicho
    constructor (private repository: ContactRepository){}


    //metodo para obtenrlos todos, utilizamos try catch para el manejo de error 
    async execute(contact: Contact ): Promise<void> {
        try {
            return await this.repository.createContact(contact);
        } catch (error) {
            console.error('Error al agregar el contact', error);
            throw new Error('No se pudo crear un contacto nuevo');
        }
    }
}