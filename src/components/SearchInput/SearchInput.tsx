'use client';
import React from 'react';
import { useVenueSearch } from '@/utils/hooks/useVenueSearch';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './SearchInput.module.scss';
import { SIZES } from '@/utils/types';
import localTexts from './searchInput.texts.json';

export default function SearchInput() {
  const {
    searchTerm,
    isLoading,
    displayOptions,
    showDropdown,
    showNoResults,
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
          placeholder={localTexts.placeholder}
          className={styles.searchInput}
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-describedby="search-help"
        />
        
        {isLoading && (
          <div 
            className={styles.loadingIndicator}
            aria-live="polite"
            aria-label={localTexts.loadingLabel}
          >
            <LoadingSpinner size={SIZES.SMALL} />
          </div>
        )}
      </div>

      <div id="search-help" className="sr-only">
        {localTexts.helpText}
      </div>

      {showDropdown && (
        <div 
          className={styles.dropdown}
          role="listbox"
          aria-label={localTexts.venueOptions.replace('{count}', displayOptions.length.toString())}
        >
          <div className={styles.sectionHeader} role="presentation">
            {searchTerm.length >= 3 ? localTexts.searchResults : localTexts.recentVenues}
          </div>
          {displayOptions.map((venue, index) => (
            <div
              key={venue.id}
              id={`search-option-${index}`}
              className={styles.dropdownItem}
              onClick={() => handleVenueSelect(venue)}
              role="option"
              tabIndex={-1}
              aria-label={`${venue.name}, ${venue.city}`}
            >
              <div className={styles.venueName}>{venue.name}</div>
              <div className={styles.venueCity}>{venue.city}</div>
            </div>
          ))}
        </div>
      )}

      {showNoResults && (
        <div 
          className={styles.dropdown}
          role="status"
          aria-live="polite"
          aria-label={localTexts.noVenuesFound}
        >
          <div className={styles.noResults}>
            {localTexts.noResults.replace('{searchTerm}', searchTerm)}
          </div>
        </div>
      )}
    </div>
  );
}
