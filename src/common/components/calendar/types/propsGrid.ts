import { EventType } from '../../../../features/shared/organisms/Calendar/CalendarPanel/types/types';

export interface Props {
  days: (Date | null)[];
  getEventsForDay: (date: Date) => EventType[];
  onDayPress: (events: EventType[]) => void;
}