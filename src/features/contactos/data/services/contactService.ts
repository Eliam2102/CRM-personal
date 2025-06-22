import * as Contacts from 'expo-contacts';
import { ContactModel } from '../models/contactModel';

export class ContactService {
  async getContacts(): Promise<ContactModel[]> {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permiso denegado para acceder a contactos.');
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.Image],
    });

    return data
      .filter(contact => contact.name)
      .map(contact => ({
        id: contact.id ?? '',
        name: contact.name ?? 'Sin nombre',
        imageUri: contact.image?.uri ?? 'https://example.com/default-image.png',
      }));
  }

  async getContactById(id: string): Promise<ContactModel | null> {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.Image],
    });

    const contact = data.find(c => c.id === id);

    if (!contact) return null;

    return {
      id: contact.id,
      name: contact.name ?? 'Sin nombre',
      imageUri: contact.image?.uri ?? 'https://example.com/default-image.png',
    };
  }

  async createContact(contact: ContactModel): Promise<void> {
    await Contacts.addContactAsync({
        [Contacts.Fields.Name]: contact.name,
        contactType: 'company'
    });
  }

    async updateContact(contact: ContactModel): Promise<void> {
        //esto es para vlidar si es indefinido
    if (!contact.id) {
        throw new Error('El contacto debe tener un ID para poder actualizarse.');
    }
    await Contacts.updateContactAsync({
        id: contact.id, // Ahora Typescript sabe que no es undefined
        [Contacts.Fields.Name]: contact.name,
    });
  }

  async deleteContact(id: string): Promise<void> {
    await Contacts.removeContactAsync(id);
  }
}