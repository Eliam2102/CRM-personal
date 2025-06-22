import { Contact } from "../entities/contact";
import { ContactRepository } from "../repository/ContactRepository";

export class GetContactByIdUseCase {
    //inyeccion del repositorio através del constructoor
    //es private para uqe solo através de el se pueda accceder a dicho
    constructor (private repository: ContactRepository){}


    //metodo para obtenrlos todos, utilizamos try catch para el manejo de error 
    async execute(id: string): Promise<Contact | null> {
        try {
            return await this.repository.getContactById(id);
        } catch (error) {
            console.error('Error al encontrar el contacto:', error);
            throw new Error('No se pudo obtener ese contacto');
        }
    }
}