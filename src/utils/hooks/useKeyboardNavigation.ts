import { useState, useEffect } from 'react';

interface UseKeyboardNavigationProps<T> {
  options: T[];
  onSelect: (option: T) => void;
  isVisible: boolean;
}

export const useKeyboardNavigation = <T>({ options, onSelect, isVisible }: UseKeyboardNavigationProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [options]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (!isVisible || options.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => 
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < options.length) {
          onSelect(options[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setActiveIndex(-1);
        break;
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(options[index]);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => 
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Escape':
        e.preventDefault();
        setActiveIndex(-1);
        break;
    }
  };

  return {
    activeIndex,
    handleInputKeyDown,
    handleOptionKeyDown,
    setActiveIndex,
  };
};
