export enum VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum TAG_TYPES {
  FEATURED = 'featured',
  ON_SALE = 'on_sale',
}

export enum SIZES {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum CURRENCIES {
  GBP = 'GBP',
  USD = 'USD',
  EUR = 'EUR',
}

export enum STATUS {
  ON_SALE = 'on-sale',
  CANCELLED = 'cancelled',
}

export interface Event {
  venue: string;
  date: string;
  currency: CURRENCIES;
  price: number | null;
  location: Location;
  status: STATUS;
  venues: Venue[];
  apple_music_tracks:  {
    open_url: string;
    preview_url: string;
    title: string;
  }[];
  sold_out: boolean;
  featured: boolean;
  event_images: EventImages;
  ticket_types: TicketType[];
  id: string;
  name: string;
  spotify_tracks: {
    open_url: string;
    preview_url: string;
    title: string;
  }[];
  description: string;
  lineup: Lineup[];
  sale_start_date: string;
}

export interface City {
  code: string;
  country_alpha3: string;
  country_id: string;
  country_name: string;
  id: string;
  name: string;
}

export interface Location {
  state: string;
  zip: string;
  country: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  accuracy: number;
  place: string;
  street: string;
}

export interface Venue {
  city: City;
  id: number;
  name: string;
  url: string;
}

export interface Promoter {
  id: number;
  name: string;
}

export interface EventImages {
  brand: string | null;
  landscape: string;
  portrait: string;
  square: string;
}

export interface TicketType {
  id: number;
  name: string;
  price: {
    total: number;
    fees: number;
    face_value: number;
  };
  sold_out: boolean;
}

export interface Lineup {
  details: string;
  time: string;
}
