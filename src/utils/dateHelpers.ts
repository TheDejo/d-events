import { format, addHours } from 'date-fns';

export const formatEventDateTime = (date: Date): string => {
  return `${format(date, 'EEE d MMM')} — ${format(date, 'h:mma')}`;
};

export const formatTime = (date: Date): string => {
  return format(date, 'ha');
};

export const calculateCurfewTime = (eventDate: Date): Date => {
  return addHours(eventDate, 3);
};
