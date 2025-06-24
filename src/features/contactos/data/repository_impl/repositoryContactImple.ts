import { ContactService } from "../services/contactService";
import { ContactRepository } from "../../domain/repository/ContactRepository";
import { Contact } from "../../domain/entities/contact";
import { mapContactModelToEntity, mapEntityToContactModel } from "../mappers/ContactMapper";

export class ContactRepositoryImpl implements ContactRepository {
  private service = new ContactService();

  async getContacts(): Promise<Contact[]> {
  const models = await this.service.getContacts();
  return models.map(mapContactModelToEntity);
  }

  async getContactById(id: string): Promise<Contact | null> {
    const model = await this.service.getContactById(id);
    if (!model) return null;
    return mapContactModelToEntity(model);
  }

  // async createContact(contact: Contact): Promise<void> {
  //   const model = mapEntityToContactModel(contact);
  //   await this.service.createContact(model);
  // }

  // async updateContact(contact: Contact): Promise<void> {
  //   const model = mapEntityToContactModel(contact);
  //   await this.service.updateContact(model);
  // }

  // async deleteContact(id: string): Promise<void> {
  //   await this.service.deleteContact(id);
  // }
}