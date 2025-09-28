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

  return (
    <div className={styles.accordion}>
      <button 
        className={styles.accordionHeader}
        onClick={toggleAccordion}
        type="button"
      >
        <span>{title}</span>
        <span className={styles.indicator}>
          {isOpen ? '-' : '+'}
        </span>
      </button>
      
      <div className={cx(styles.accordionContent, { [styles.open]: isOpen })}>
        {children}
      </div>
    </div>
  );
}
