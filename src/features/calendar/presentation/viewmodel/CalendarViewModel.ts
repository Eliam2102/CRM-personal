import { CalendarEvent } from "../../domain/entities/event";
import { useState, useEffect, useCallback } from "react";
import { EventRepositoryImpl } from '../../data/repositroy_imple/CalendarRepositoryImple';
import { AddEventUseCase } from "../../domain/useCases/AddEventuseCase";
import { DeleteEventUseCase } from "../../domain/useCases/DeleteEventUseCase";
import { EditEventUseCase } from "../../domain/useCases/EditEventUseCase";
import { GetAllEventsUseCase } from "../../domain/useCases/getAllEventsUseCase";
import { GetEventByIdUseCase } from "../../domain/useCases/GetEventByIdUseCase";

export const CalendarViewModel = () => {
  const repository = new EventRepositoryImpl();

  const getAllEventsUseCase = new GetAllEventsUseCase(repository);
  const getEventByIdUseCase = new GetEventByIdUseCase(repository);
  const addEventUseCase = new AddEventUseCase(repository);
  const editEventUseCase = new EditEventUseCase(repository);
  const deleteEventUseCase = new DeleteEventUseCase(repository);

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAllEventsUseCase.execute();
      setEvents(result);
      console.log('Eventos obtenidos:', result);
    } catch (err) {
      setError('Error al cargar eventos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchEventById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getEventByIdUseCase.execute(id);
      setSelectedEvent(result);
    } catch (err) {
      setError('Error al obtener el evento.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: CalendarEvent): Promise<string | undefined> => {
  setIsLoading(true);
  setError(null);
  try {
    const eventId = await addEventUseCase.execute(event);
    await fetchEvents();
    return eventId;
  } catch (err) {
    setError('Error al crear el evento.');
    return undefined;
  } finally {
    setIsLoading(false);
  }
}, [fetchEvents]);


  const updateEvent = useCallback(async (event: CalendarEvent) => {
    setIsLoading(true);
    setError(null);
    try {
      await editEventUseCase.execute(event);
      await fetchEvents();
    } catch (err) {
      setError('Error al actualizar el evento.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvents]);

  const deleteEvent = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteEventUseCase.execute(id);
      await fetchEvents();
    } catch (err) {
      setError('Error al eliminar el evento.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    selectedEvent,
    isLoading,
    error,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};