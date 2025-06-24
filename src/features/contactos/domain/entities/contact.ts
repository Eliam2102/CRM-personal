//creación de la interface de contacto
export interface Contact {
  id: string;
  name: string;
  imageUri?: string;
  contactType?: string;
  firstName?: string;
  lastName?: string;
  isFavorite?: boolean;
  lookupKey?: string;
}