'use client';
import React from 'react';
import { useVenueSearch } from '@/utils/hooks/useVenueSearch';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './SearchInput.module.scss';
import { SIZES } from '@/utils/types';

export default function SearchInput() {
  const {
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
  } = useVenueSearch();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search venues..."
          className={styles.searchInput}
        />
        
        {isLoading && (
          <div className={styles.loadingIndicator}>
            <LoadingSpinner size={SIZES.SMALL} />
          </div>
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.sectionHeader}>
            {shouldSearch ? 'Search results' : 'Recent venues'}
          </div>
          {displayOptions.map((venue) => (
            <div
              key={venue.id}
              className={styles.dropdownItem}
              onClick={() => handleVenueSelect(venue)}
            >
              <div className={styles.venueName}>{venue.name}</div>
              <div className={styles.venueCity}>{venue.city}</div>
            </div>
          ))}
        </div>
      )}

      {showNoResults && (
        <div className={styles.dropdown}>
          <div className={styles.noResults}>
            No venues found for &quot;{debouncedSearchTerm}&quot;
          </div>
        </div>
      )}
    </div>
  );
}
