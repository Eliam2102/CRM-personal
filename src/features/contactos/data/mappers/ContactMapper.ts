import { ContactModel } from '../models/contactModel';
import { Contact } from '../../domain/entities/contact';

// De modelo (data) a entidad (dominio)
export function mapContactModelToEntity(model: ContactModel): Contact {
  return {
    id: model.id ?? '',
    name: model.name,
    imageUri: model.imageUri,
    contactType: model.contactType,
    firstName: model.firstName,
    lastName: model.lastName,
    isFavorite: model.isFavorite ?? false,
    lookupKey: model.lookupKey,
    priority: model.priority ?? 'ninguna',

    phoneNumbers: (model.phoneNumbers ?? []).map(number => ({
      number,
      label: '',
    })),

    emails: (model.emails ?? []).map(email => ({
      email,
      label: '',
    })),
  };
}

// De entidad (dominio) a modelo (data)
export function mapEntityToContactModel(entity: Contact): ContactModel {
  return {
    id: entity.id,
    name: entity.name,
    firstName: entity.firstName ?? '',
    lastName: entity.lastName ?? '',
    contactType: entity.contactType ?? 'person',
    imageUri: entity.imageUri ?? '',
    isFavorite: entity.isFavorite ?? false,
    lookupKey: entity.lookupKey ?? '',
    imageAvailable: !!entity.imageUri,
    priority: entity.priority ?? 'ninguna',

    phoneNumbers: (entity.phoneNumbers ?? []).map(p => p.number),
    emails: (entity.emails ?? []).map(e => e.email),
  };
}