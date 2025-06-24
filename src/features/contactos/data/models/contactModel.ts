export interface ContactModel {
  id: string | undefined;
  name: string;
  firstName: string;
  lastName: string;
  contactType: string;
  imageAvailable: boolean;
  imageUri?: string;
  isFavorite: boolean;
  lookupKey: string;
}