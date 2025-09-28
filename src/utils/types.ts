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

export interface Event {
  flags: string[];
  venue: string;
  hash: string;
  perm_name: string;
  genre_tags: string[];
  date: string; // ISO date string
  currency: string;
  price: number | null;
  images: string[];
  destination_event_perm_name: string | null;
  int_id: number;
  cities: City[];
  age_limit: string;
  location: Location;
  all_ttys_code_locked: boolean;
  raw_description: string;
  url: string;
  timezone: string;
  type_tags: string[];
  status: string;
  show_price_breakdown: boolean;
  venues: Venue[];
  presented_by: string;
  apple_music_tracks: any[];
  sold_out: boolean;
  announcement_date: string;
  destination_event_id: string | null;
  links: any[];
  external_url: string | null;
  is_multi_days_event: boolean;
  featured: boolean;
  sale_end_date: string;
  linkout_type: string | null;
  promoters: Promoter[];
  checksum: string;
  event_images: EventImages;
  date_end: string;
  ticket_types: TicketType[];
  id: string;
  name: string;
  spotify_tracks: any[];
  detailed_artists: any[];
  bundles: any[];
  type: string;
  tags: string[];
  description: string;
  lineup: Lineup[];
  address: string;
  sale_start_date: string;
  artists: any[];
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
