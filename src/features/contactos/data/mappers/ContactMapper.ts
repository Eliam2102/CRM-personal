import { ContactModel } from '../models/contactModel';
import { Contact } from '../../domain/entities/contact';

export function mapContactModelToEntity(model: ContactModel): Contact {
  return {
    id: model.id ?? '', // aseguro que nunca sea undefined
    name: model.name,
    imageUri: model.imageUri,
  };
}

export function mapEntityToContactModel(entity: Contact): ContactModel {
  return {
    id: entity.id,
    name: entity.name,
    imageUri: entity.imageUri ?? 'https://example.com/default-image.png',
  };
}