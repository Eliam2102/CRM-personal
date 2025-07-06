export interface ContactModel {
  id: string;
  name: string;
  imageUri?: string;
  contactType?: 'person' | 'company';
  firstName?: string;
  lastName?: string;
  isFavorite?: boolean;
  lookupKey?: string;
  imageAvailable?: boolean;
  priority?: 'alta' | 'media' | 'baja' | 'ninguna';
  phoneNumbers?: string[];
  emails?: string[];
}