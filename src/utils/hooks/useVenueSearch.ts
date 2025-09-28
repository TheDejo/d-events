import { useState, useMemo, useEffect } from 'react';
import { useEventsContext } from '../context/EventsContext';
import useLocalStorage from './useLocalStorage';
import { useDebounce } from './useDebounce';
import { constants } from '@/config/constants';
import { Event } from '@/utils/types';

const { LOCAL_STORAGE_KEYS } = constants;

interface VenueOption {
  id: string;
  name: string;
  city: string;
}

export const useVenueSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentVenues, setRecentVenues] = useLocalStorage<VenueOption[]>(LOCAL_STORAGE_KEYS.RECENT_VENUES, []);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: eventsData, isLoading, setVenue } = useEventsContext();

  useEffect(() => {
    setVenue(debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : '');
  }, [debouncedSearchTerm, setVenue]);

  const venueOptions = useMemo(() => {
    if (!eventsData || debouncedSearchTerm.length < 3) return [];
    
    const venues = new Map<string, VenueOption>();
    const searchLower = debouncedSearchTerm.toLowerCase();
    
    eventsData.forEach((event: Event) => {
      event.venues?.forEach((venue) => {
        const venueName = venue.name.toLowerCase();
        const cityName = venue.city.name.toLowerCase();
        
        if (venueName.includes(searchLower) || cityName.includes(searchLower)) {
          venues.set(venue.id.toString(), {
            id: venue.id.toString(),
            name: venue.name,
            city: venue.city.name,
          });
        }
      });
    });
    
    return Array.from(venues.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [eventsData, debouncedSearchTerm]);

  const displayOptions = useMemo(() => {
    if (debouncedSearchTerm.length >= 3) return venueOptions;
    if (!searchTerm && recentVenues.length > 0) return recentVenues.slice(0, 5);
    return [];
  }, [venueOptions, recentVenues, searchTerm, debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleVenueSelect = (venue: VenueOption) => {
    setSearchTerm(venue.name);
    setIsOpen(false);
    setRecentVenues(prev => [venue, ...prev.filter(v => v.id !== venue.id)].slice(0, 10));
  };

  const handleInputFocus = () => {
    if (displayOptions.length > 0) setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  return {
    searchTerm,
    isLoading,
    displayOptions,
    showDropdown: isOpen && displayOptions.length > 0,
    showNoResults: isOpen && !isLoading && displayOptions.length === 0 && debouncedSearchTerm.length >= 3,
    handleInputChange,
    handleVenueSelect,
    handleInputFocus,
    handleInputBlur,
  };
};
