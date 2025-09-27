import React from 'react';
import styles from './eventCard.module.scss';
import Image from 'next/image';
import Accordion from '../Accordion/Accordion';
import { Button } from '../Button/Button';
import { 
  formatEventDateTime, 
  formatTime, 
  calculateCurfewTime 
} from '../../utils/dateHelpers';
import localTexts from './eventCard.texts.json';

type EventCardProps = {
  title: string;
  location: string;
  imgSrc: string;
  imgAlt: string;
  date: Date;
  price: number;
  facility: string;
  lineup: {
    name: string[];
    curfew: Date;
  };
  tickets: {
    name: string;
    price: number;
    soldOut: boolean;
  }[];
  description: string;
}

export default function EventCard({ 
  title, 
  location, 
  imgSrc,
  imgAlt,
  date, 
  price, 
  facility,
  lineup, 
  tickets, 
  description }: EventCardProps) {
  
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventCardHeader}>
        <Image 
          src={imgSrc} 
          alt={imgAlt} 
          width={320} 
          height={320} 
          className={styles.eventCardImage} 
        />
        <div className={styles.textBox}>
          <p className={styles.date}>
            {formatEventDateTime(date)}
          </p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.facility}>{facility}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
      <div className={styles.accordionContainer}>
          <Accordion title={localTexts.moreInfo}>
            <div className={styles.accordionBody}>
              <p className={styles.description}>{description}</p>
              <div className={styles.lineupSection}>
                <h4 className={styles.accordionSectionTitle}>{localTexts.lineup}</h4>
                {lineup.name.map((name, index) => (
                  <p className={styles.lineupName} key={index}>{name}</p>
                ))}
              <p className={styles.lineupTime}>
                {lineup.curfew && (
                  <>
                    {localTexts.curfew}{' '}
                    <span className={styles.lineupTimeValue}>
                      — {formatTime(calculateCurfewTime(lineup.curfew))}
                    </span>
                  </>
                )}
              </p>

              </div>
              <div className={styles.ticketsSection}>
                <h4 className={styles.accordionSectionTitle}>{localTexts.tickets}</h4>
                {tickets.map((ticket, index) => (
                  <p key={index}>{ticket.name} <span className={styles.seatPrice}>— £{ticket.price}</span> <span className={styles.soldOut}>{ticket.soldOut ? localTexts.soldOut : ''}</span></p>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
        <div className={styles.footer}>
            <Button title={localTexts.ctaOne} />
            <div className={styles.price}>
              <p className={styles.priceLabel}>{localTexts.from}</p>
              <p className={styles.priceValue}>£{price}</p>
            </div>
        </div>
    </div>
  )
}
