import * as Contacts from 'expo-contacts';
import { ContactModel } from '../models/contactModel';

export class ContactService {
  async getContacts(): Promise<ContactModel[]> {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permiso denegado para acceder a contactos.');
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.Name,
        Contacts.Fields.Image,
        Contacts.Fields.ContactType,
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Note, // Aquí puedes guardar prioridad como texto
      ],
    });

    return data
      .filter(contact => contact.name)
      .map(contact => ({
        id: contact.id ?? '',
        name: contact.name ?? 'Sin nombre',
        firstName: contact.firstName ?? '',
        lastName: contact.lastName ?? '',
        contactType: contact.contactType ?? 'person',
        imageAvailable: contact.imageAvailable ?? false,
        imageUri: contact.image?.uri ?? '',
        isFavorite: (contact as any).isFavorite ?? false,
        lookupKey: (contact as any).lookupKey ?? '',
        priority: (contact.note as any) ?? 'ninguna',
        phoneNumbers: contact.phoneNumbers
          ?.map(p => p.number)
          .filter((n): n is string => typeof n === 'string') ?? [],
        emails: [], // no se usan, pero se define vacío por consistencia
      }));
  }

  async getContactById(id: string): Promise<ContactModel | null> {
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.Name,
        Contacts.Fields.Image,
        Contacts.Fields.ContactType,
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Note,
      ],
    });

    const contact = data.find(c => c.id === id);
    if (!contact) return null;

    return {
      id: contact.id ?? '',
      name: contact.name ?? 'Sin nombre',
      firstName: contact.firstName ?? '',
      lastName: contact.lastName ?? '',
      contactType: contact.contactType ?? 'person',
      imageAvailable: contact.imageAvailable ?? false,
      imageUri: contact.image?.uri ?? '',
      isFavorite: (contact as any).isFavorite ?? false,
      lookupKey: (contact as any).lookupKey ?? '',
      priority: (contact.note as any) ?? 'ninguna',
      phoneNumbers: contact.phoneNumbers
        ?.map(p => p.number)
        .filter((n): n is string => typeof n === 'string') ?? [],
      emails: [],
    };
  }

  async createContact(contact: ContactModel): Promise<void> {
    await Contacts.addContactAsync({
      [Contacts.Fields.Name]: contact.name,
      [Contacts.Fields.FirstName]: contact.firstName,
      [Contacts.Fields.LastName]: contact.lastName,
      [Contacts.Fields.Note]: contact.priority ?? 'ninguna',
      [Contacts.Fields.ContactType]: contact.contactType ?? 'person',
      [Contacts.Fields.PhoneNumbers]: (contact.phoneNumbers ?? []).map(number => ({
        number,
        label: 'mobile',
      })),
    });
  }

  async updateContact(contact: ContactModel): Promise<void> {
    if (!contact.id) {
      throw new Error('El contacto debe tener un ID para poder actualizarse.');
    }

    await Contacts.updateContactAsync({
      id: contact.id,
      [Contacts.Fields.Name]: contact.name,
      [Contacts.Fields.FirstName]: contact.firstName,
      [Contacts.Fields.LastName]: contact.lastName,
      [Contacts.Fields.Note]: contact.priority ?? 'ninguna',
      [Contacts.Fields.ContactType]: contact.contactType ?? 'person',
      [Contacts.Fields.PhoneNumbers]: (contact.phoneNumbers ?? []).map(number => ({
        number,
        label: 'mobile',
      })),
    });
  }

  async deleteContact(id: string): Promise<void> {
    await Contacts.removeContactAsync(id);
  }
}