import { constants } from '../constants';
import { Event } from '@/utils/types';
import customFetch from '../customFetch';

const { API } = constants;

export interface GetEvents {
  data: Event[];
  links: {
    self: string;
    next: string;
  };
}

export interface EventsParams {
  page?: number;
  limit?: number;
  venue?: string;
}

const buildEventsUrl = (baseUrl: string, params: EventsParams): string => {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page[number]', params.page.toString());
  if (params.limit) searchParams.set('page[size]', params.limit.toString());
  if (params.venue) searchParams.set('filter[venues]', params.venue);
  
  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

const getEvents = async ({ 
  params 
}: { 
  params: EventsParams 
}): Promise<GetEvents> => {
  const url = buildEventsUrl(API.routes.events, params);
  
  const response = await customFetch(url);

  return response.json();
};

export const eventsService = {
  getEvents,
};