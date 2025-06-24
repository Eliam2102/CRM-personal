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
    console.log('Datos crudos desde expo-contacts:', data);

    return data
    .filter(contact => contact.name)
    .map(contact => ({
      id: contact.id ?? '',
      name: contact.name ?? 'Sin nombre',
      firstName: contact.firstName ?? '',
      lastName: contact.lastName ?? '',
      contactType: contact.contactType ?? '',
      imageAvailable: contact.imageAvailable ?? false,
      imageUri: contact.image?.uri ?? undefined,
      isFavorite: contact.isFavorite ?? false,
      lookupKey: (contact as any).lookupKey ?? '',
    }));
  }

  //esto lo implementamos de esta manera, puesto que expo-comntacts, no tiene un 
  //punto exacto para consulta uno en especifico, por ello, se opta por consultar la lista y filtratlo segpun el id 
  //y con ello simplemente se regresa ese mismo
 async getContactById(id: string): Promise<ContactModel | null> {
  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.Image],
  });

  const contact = data.find(c => c.id === id);

  if (!contact) return null;

 return {
  id: contact.id ?? '',
  name: contact.name ?? 'Sin nombre',
  firstName: (contact as any).firstName ?? 'No registrado',
  lastName: (contact as any).lastName ?? 'No registrado',
  contactType: (contact as any).contactType ?? 'Desconocido',
  imageAvailable: contact.imageAvailable ?? false,
  imageUri: contact.image?.uri ?? 'https://example.com/default-image.png',
  isFavorite: (contact as any).isFavorite ?? false,
  lookupKey: (contact as any).lookupKey ?? 'Sin clave',
};
}

  // Este metodo se habilitará para poder crear un contacto en un futuro
  // async createContact(contact: ContactModel): Promise<void> {
  //   await Contacts.addContactAsync({
  //       [Contacts.Fields.Name]: contact.name,
  //       contactType: 'company'
  //   });
  // }

  //   async updateContact(contact: ContactModel): Promise<void> {
  //       //esto es para vlidar si es indefinido
  //   if (!contact.id) {
  //       throw new Error('El contacto debe tener un ID para poder actualizarse.');
  //   }
  //   await Contacts.updateContactAsync({
  //       id: contact.id, // Ahora Typescript sabe que no es undefined
  //       [Contacts.Fields.Name]: contact.name,
  //   });
  // }

  // async deleteContact(id: string): Promise<void> {
  //   await Contacts.removeContactAsync(id);
  // }
}