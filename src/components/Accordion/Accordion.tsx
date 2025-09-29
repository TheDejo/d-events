'use client'
import React from 'react';
import styles from './accordion.module.scss';
import cx from 'classnames';

type AccordionProps = {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

export default function Accordion({ children, title, isOpen, onToggle }: AccordionProps) {
  const toggleAccordion = () => {
    onToggle(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion();
    }
  };

  return (
    <div className={styles.accordion}>
      <button 
        className={styles.accordionHeader}
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
        type="button"
        aria-expanded={isOpen}
        aria-controls="accordion-content"
      >
        <span>{title}</span>
        <span className={styles.indicator}>
          {isOpen ? '-' : '+'}
        </span>
      </button>
      
      <div 
        id="accordion-content"
        className={cx(styles.accordionContent, { [styles.open]: isOpen })}
      >
        {children}
      </div>
    </div>
  );
}
