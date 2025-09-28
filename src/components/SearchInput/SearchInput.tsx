'use client';
import React, { useRef } from 'react';
import { useVenueSearch } from '@/utils/hooks/useVenueSearch';
import { useKeyboardNavigation } from '@/utils/hooks/useKeyboardNavigation';
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

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    activeIndex,
    handleInputKeyDown,
    handleOptionKeyDown,
  } = useKeyboardNavigation({
    options: displayOptions,
    onSelect: handleVenueSelect,
    isVisible: showDropdown,
  });

  const handleContainerBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      handleInputBlur();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={styles.searchContainer}
      onBlur={handleContainerBlur}
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          placeholder={localTexts.placeholder}
          className={styles.searchInput}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="search-dropdown"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-describedby="search-help"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
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
          id="search-dropdown"
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
              className={`${styles.dropdownItem} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => handleVenueSelect(venue)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              role="option"
              tabIndex={0}
              aria-label={`${venue.name}, ${venue.city}`}
              aria-selected={index === activeIndex}
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
