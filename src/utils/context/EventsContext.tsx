'use client';

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Event } from '@/utils/types';
import { constants } from '@/config/constants';
import { eventsService, EventsParams, GetEvents } from '@/config/services/events';
import logger from '../logger.config';

const {
  API: { routes: { events } },
} = constants;

const PAGE_SIZE = 12;

type EventsContextProps = {
  data: Event[];           
  isLoading: boolean;     
  isFetchingMore: boolean; 
  refresh: () => void;  
  setVenue: (v: string) => void;
  venue: string;
  loadMore: () => void;
  hasMore: boolean;
};

const EventsContext = createContext<EventsContextProps | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venue, setVenue] = useState('');

  const getKey = (pageIndex: number, previousPage: GetEvents | null) => {
    if (previousPage && (!previousPage.data || previousPage.data.length === 0)) return null;

    const params: EventsParams = { page: pageIndex + 1, limit: PAGE_SIZE, venue };
    return `${events}?params=${JSON.stringify(params)}`;
  };

  const fetcher = async (key: string) => {
    const query = JSON.parse(new URLSearchParams(key.split('?')[1]).get('params') as string) as EventsParams;
    return eventsService.getEvents({ params: query });
  };

  const {
    data: pages,
    size,
    setSize,
    mutate,
    isLoading,       
    isValidating,
  } = useSWRInfinite<GetEvents>(getKey, fetcher);

  const flatEvents = useMemo(
    () => (pages ?? []).flatMap(p => p?.data ?? []),
    [pages]
  );

  const lastPage = pages?.[pages.length - 1];
  const hasMore = !!lastPage?.links?.next;

  const loadMore = useCallback(() => {
    if (hasMore && !isValidating) setSize(size + 1);
  }, [hasMore, isValidating, setSize, size]);

  const refresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const value = useMemo<EventsContextProps>(() => ({
    data: flatEvents,
    isLoading: !!isLoading && flatEvents.length === 0,
    isFetchingMore: !!isValidating && !!flatEvents.length,
    refresh,
    setVenue,
    venue,
    loadMore,
    hasMore,
  }), [flatEvents, isLoading, isValidating, refresh, setVenue, venue, loadMore, hasMore]);

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};

export const useEventsContext = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEventsContext must be used within EventsProvider');
  return ctx;
};
