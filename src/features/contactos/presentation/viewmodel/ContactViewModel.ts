import { useState, useEffect, useCallback } from "react";
import { Contact } from "../../domain/entities/contact";
import { ContactRepositoryImpl } from "../../data/repository_impl/repositoryContactImple";
import { GetContactByIdUseCase } from "../../domain/useCase/GetContactByIdUseCase";
import { GetContactsUseCase } from "../../domain/useCase/getContactsUseCase";
import { DeleteContactUseCase } from "../../domain/useCase/DeleteContactUseCase";
import { UpdateContactsUseCase } from "../../domain/useCase/UpdateContactUseCase";
import { CreateContactsUseCase } from "../../domain/useCase/CreateContactUseCase";

export const ContactViewModel = () => {
  const repository = new ContactRepositoryImpl();

  const getContactsUseCase = new GetContactsUseCase(repository);
  const getContactByIdUseCase = new GetContactByIdUseCase(repository);
  const createContactUseCase = new CreateContactsUseCase(repository);
  const updateContactUseCase = new UpdateContactsUseCase(repository);
  const deleteContactUseCase = new DeleteContactUseCase(repository);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getContactsUseCase.execute();
      setContacts(result);
    } catch (err) {
      setError('Error al cargar contactos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchContactById = useCallback(async (id: string): Promise<Contact | null> => {
    try {
      const result = await getContactByIdUseCase.execute(id);
      setSelectedContact(result);
      return result;
    } catch (err) {
      setError('Error al obtener el contacto.');
      return null;
    }
  }, []);

  const createContact = useCallback(async (contact: Contact) => {
    setIsLoading(true);
    setError(null);
    try {
      await createContactUseCase.execute(contact);
      await fetchContacts();
    } catch (err) {
      setError('Error al crear el contacto.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchContacts]);

  const updateContact = useCallback(async (contact: Contact) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateContactUseCase.execute(contact);
      await fetchContacts();
    } catch (err) {
      setError('Error al actualizar el contacto.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchContacts]);

  const deleteContact = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteContactUseCase.execute(id);
      await fetchContacts();
    } catch (err) {
      setError('Error al eliminar el contacto.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchContacts]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    selectedContact,
    isLoading,
    error,
    fetchContacts,
    fetchContactById,
    createContact,
    updateContact,
    deleteContact,
  };
};