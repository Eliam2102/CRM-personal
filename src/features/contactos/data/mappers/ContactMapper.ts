import { ContactModel } from '../models/contactModel';
import { Contact } from '../../domain/entities/contact';

// mapear (convertir de modelo a entidad)
export function mapContactModelToEntity(model: ContactModel): Contact {
  return {
    id: model.id ?? '',
    name: model.name,
    imageUri: model.imageUri,
    contactType: model.contactType,
    firstName: model.firstName,
    lastName: model.lastName,
    isFavorite: model.isFavorite,
    lookupKey: model.lookupKey,
  };
}

//este es para transofrmar de entidad a modelo, en el caso de agregar y editar
// porqu lo toman de forma procesada como viene de presnetacion y 
//lo transformar a como lo espera expo-contacts
export function mapEntityToContactModel(entity: Contact): ContactModel {
  return {
    id: entity.id,
    name: entity.name,
    firstName: entity.firstName ?? '',
    lastName: entity.lastName ?? '',
    contactType: entity.contactType ?? '',
    imageUri: entity.imageUri ?? 'https://example.com/default-image.png',
    isFavorite: entity.isFavorite ?? false,
    lookupKey: entity.lookupKey ?? '',
    imageAvailable: !!entity.imageUri, // Puedes ponerlo así si lo quieres calculado
  };
}