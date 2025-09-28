import { useState, useMemo } from 'react';
import { useGetEvents } from './useGetEvents';
import useLocalStorage from './useLocalStorage';
import { useDebounce } from './useDebounce';
import { constants } from '@/config/constants';


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
  const shouldSearch = debouncedSearchTerm.length >= 3;

  const { data: eventsData, isLoading } = useGetEvents({
    params: {
      venue: shouldSearch ? debouncedSearchTerm : undefined,
      limit: Infinity,
    },
  });

  const venueOptions = useMemo(() => {
    if (!eventsData?.data || !shouldSearch) return [];
    
    const venues = new Map<string, VenueOption>();
    const searchLower = debouncedSearchTerm.toLowerCase();
    
    eventsData.data.forEach(event => {
      event.venues?.forEach(venue => {
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
  }, [eventsData, debouncedSearchTerm, shouldSearch]);

  const displayOptions = useMemo(() => {
    if (shouldSearch) return venueOptions;
    if (!searchTerm && !!recentVenues.length) return recentVenues.slice(0, 5);
    return [];
  }, [venueOptions, recentVenues, searchTerm, shouldSearch]);

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
    if (!!displayOptions.length) setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const showDropdown = isOpen && !!displayOptions.length;
  const showNoResults = isOpen && !isLoading && !displayOptions.length && shouldSearch;

  return {
    searchTerm,
    isLoading,
    displayOptions,
    showDropdown,
    showNoResults,
    shouldSearch,
    debouncedSearchTerm,
    handleInputChange,
    handleVenueSelect,
    handleInputFocus,
    handleInputBlur,
  };
};
