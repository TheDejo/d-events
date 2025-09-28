'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { Event } from '@/utils/types';
import { useGetEvents } from '../hooks/useGetEvents';

interface EventsContextProps {
  data?: Event[] | null;
  mutate: () => void;
  isLoading?: boolean;
}

const EventsContext = createContext<EventsContextProps>({
  data: null,
  isLoading: false,
  mutate: () => {},
});

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, mutate, isLoading } = useGetEvents({ params: { page: 1, limit: 10 } });

  const contextValue = useMemo(
    () => ({
      data: data?.data,
      isLoading: isLoading,
      mutate: mutate,
    }),
    [data?.data, isLoading, mutate]
  );

  return <EventsContext.Provider value={contextValue}>{children}</EventsContext.Provider>;
};

export const useEventsContext = (): EventsContextProps => useContext(EventsContext);
