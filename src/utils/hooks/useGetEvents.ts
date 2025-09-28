'use client';
import useSWR from 'swr';
import { constants } from '@/config/constants';
import logger from '../logger.config';
import { EventsParams, eventsService, GetEvents } from '@/config/services/events';

const {
  API: { routes: { events } },
} = constants;

export const useGetEvents = ({ params }: { params: EventsParams }): {
  data: GetEvents | undefined;
  mutate: () => void;
  isLoading: boolean;
} => {
  const fetcher = async () => {
    try {
      const response = await eventsService.getEvents({ params });

      return response;
    } catch (error) {
      logger({ error });
      throw error;
    }
  };

  const { data, mutate, isLoading } = useSWR([events + JSON.stringify(params)], fetcher);

  return {
    data,
    isLoading,
    mutate,
  };
};