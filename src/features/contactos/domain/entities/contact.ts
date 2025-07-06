export interface Contact {
  id: string;
  name: string;
  imageUri?: string;
  contactType?: 'person' | 'company';
  firstName?: string;
  lastName?: string;
  isFavorite?: boolean;
  lookupKey?: string;
  priority: 'alta' | 'media' | 'baja' | 'ninguna';
  phoneNumbers?: { label?: string; number: string }[];
  emails?: { label?: string; email: string }[];
}