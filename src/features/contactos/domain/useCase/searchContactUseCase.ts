import { ContactRepository } from "../../domain/repository/ContactRepository";
import { Contact } from "../../domain/entities/contact";

export class SearchContactsUseCase {
  constructor(private repository: ContactRepository) {}

  async execute(query: string): Promise<Contact[]> {
    return this.repository.searchContacts(query);
  }
}
