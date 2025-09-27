'use client'
import React, { useState } from 'react';
import styles from './accordion.module.scss';
import cx from 'classnames';

type AccordionProps = {
  children: React.ReactNode;
  title: string;
};

export default function Accordion({ children, title }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
