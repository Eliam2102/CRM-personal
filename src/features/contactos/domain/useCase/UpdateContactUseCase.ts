import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class UpdateContactsUseCase {
    //inyeccion del repositorio através del constructoor
    //es private para uqe solo através de el se pueda accceder a dicho
    constructor (private repository: ContactRepository){}


    //metodo para obtenrlos todos, utilizamos try catch para el manejo de error 
    async execute(contact : Contact): Promise<void> {
        try {
            return await this.repository.updateContact(contact)
        } catch (error) {
            console.error('Error al obtener contactos:', error);
            throw new Error('No se pudieron obtener los contactos');
        }
    }
}