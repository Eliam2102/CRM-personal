//
import { Contact } from "../entities/contact";

//creaacion de una intreface, se refiere al contrato de los metodos uqe la cpaa de data debe de seguir
export interface ContactRepository {
    //con este aseguramos traer un arrreglo de contactos por essep pone []
  getContacts(): Promise<Contact[]>;
  //para obtener un solo contacto por medio del id
  getContactById(id: string): Promise<Contact | null>;
  //crear un contacto
  // createContact(contact: Contact): Promise<void>;
  //actualizar un contacto
  // updateContact(contact: Contact): Promise<void>;
  //eliminar un contacto
  // deleteContact(id: string): Promise<void>;
}