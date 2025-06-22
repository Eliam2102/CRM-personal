import { ContactService } from "../services/contactService";
import { ContactRepository } from "../../domain/repository/ContactRepository";
import { Contact } from "../../domain/entities/contact";
import { mapContactModelToEntity, mapEntityToContactModel } from "../mappers/ContactMapper";

export class ContactRepositoryImpl implements ContactRepository {
  private service = new ContactService();

  async getContacts(): Promise<Contact[]> {
    const contacts = await this.service.getContacts();
    return contacts.map(mapContactModelToEntity);
  }

  async getContactById(id: string): Promise<Contact | null> {
    const contact = await this.service.getContactById(id);
    return contact ? mapContactModelToEntity(contact) : null;
  }

  async createContact(contact: Contact): Promise<void> {
    const model = mapEntityToContactModel(contact);
    await this.service.createContact(model);
  }

  async updateContact(contact: Contact): Promise<void> {
    const model = mapEntityToContactModel(contact);
    await this.service.updateContact(model);
  }

  async deleteContact(id: string): Promise<void> {
    await this.service.deleteContact(id);
  }
}