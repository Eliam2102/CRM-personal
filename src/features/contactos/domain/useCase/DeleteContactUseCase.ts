//crCIÓN DE UN USE CASE IMPLICA EL REPOSITORIO Y LA ENTIDAD
import { ContactRepository } from "../repository/ContactRepository";
import { Contact } from "../entities/contact";

//DEINFIR EL USE CASE, se hace através de una clase
export class DeleteContactUseCase {
    //inyectamos dependias para decirle al usecase que espero un repositorio
    //lo hacemos através del constructor
    constructor (private repository: ContactRepository){}

    //definir el metodo que se ejecutra para realizar dicha acción
    async execute(id: string): Promise<void>{
        try {return this.repository.deleteContact(id);
        }catch(error){
            console.error('Error al eliminar el contacto', error);
            throw new Error('No se pudo eliminar el contacto, intenta de nuevo');
        }
    }
}