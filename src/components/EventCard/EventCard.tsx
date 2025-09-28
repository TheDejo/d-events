import React, { useState } from 'react';
import styles from './eventCard.module.scss';
import Image from 'next/image';
import Accordion from '../Accordion/Accordion';
import { Button } from '../Button/Button';
import localTexts from './eventCard.texts.json';
import { Tag } from '../Tag/Tag';
import { CURRENCIES, STATUS, TAG_TYPES, VARIANTS } from '@/utils/types';
import PlayIcon from '../Icons/PlayIcon';
import cx from 'classnames';
import { helpers } from '@/utils/helper';

type EventCardProps = {
  title: string;
  location: string;
  date: Date;
  price: number;
  soldOut: boolean;
  featured: boolean;
  status: STATUS;
  saleStartDate: string;
  eventImage: {
    alt: string;
    landscape: string;
    square: string;
  };
  venue: string;
  lineup: {
    details: string;
    time: string;
  }[];
  currency: CURRENCIES;
  tickets: {
    name: string;
    price: number;
    soldOut: boolean;
  }[];
  description: string;
  appleMusicTracks?: { open_url: string; preview_url: string; title: string; }[];
  spotifyTracks?: { open_url: string; preview_url: string; title: string; }[];
}

const CURRENCY_DIVISOR = 100;

export default function EventCard({ 
  title, 
  location, 
  date, 
  price, 
  soldOut,
  featured,
  status,
  saleStartDate,
  eventImage,
  venue,
  lineup, 
  currency,
  tickets, 
  description,
  appleMusicTracks,
  spotifyTracks }: EventCardProps) {
  const saleDate = new Date(saleStartDate);  
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  const hasTracks = (appleMusicTracks && !!appleMusicTracks.length) || (spotifyTracks && !!spotifyTracks.length);
  
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventCardHeader}>
         <div className={cx(styles.eventCardImageContainer, { [styles.isAccordionOpen]: isAccordionOpen })}>
             <Image 
               src={isAccordionOpen ? eventImage.landscape : eventImage.square} 
               alt={eventImage.alt} 
               className={styles.eventCardImage} 
               fill
               priority={true}
             />
              <div className={styles.imageFooter}>
               {hasTracks && (
                 <Button variant={VARIANTS.TERTIARY}>
                   <PlayIcon />
                 </Button>
               )}
               {featured || status === STATUS.ON_SALE && <Tag type={featured ? TAG_TYPES.FEATURED : TAG_TYPES.ON_SALE} text={`On sale ${helpers.formatDate(saleDate)}`} />}
               </div>
         </div>
        <div className={styles.textBox}>
          <p className={styles.date}>
            {helpers.formatEventDateTime(date)}
          </p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.facility}>{venue}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>  
      <div className={styles.accordionContainer}>
          <Accordion 
            title={localTexts.moreInfo}
            isOpen={isAccordionOpen}
            onToggle={setIsAccordionOpen}
          >
            <div className={styles.accordionBody}>
              <p className={styles.description}>{description}</p>
              <div className={styles.lineupSection}>
                <h4 className={styles.accordionSectionTitle}>{localTexts.lineup}</h4>
                {lineup.map((lineup, index) => (
                  <p key={index}>{lineup.details} {lineup.time && <span className={styles.lineupTimeValue}>— {lineup.time}</span>}</p>
                ))}
              </div>
              <div className={styles.ticketsSection}>
                <h4 className={styles.accordionSectionTitle}>{localTexts.tickets}</h4>
                {tickets.map((ticket, index) => (
                  <p 
                  key={index}>{ticket.name} 
                  <span className={styles.seatPrice}>— {helpers.formatNumber({ 
                    number: ticket.price / CURRENCY_DIVISOR, 
                    isCurrency: true,
                     currency, 
                     fractionDigits: 2 })}</span> <span className={styles.soldOut}>{ticket.soldOut ? localTexts.soldOut : ''}</span></p>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
        <div className={styles.footer}>
            <Button title={soldOut ? localTexts.soldOut : localTexts.ctaOne} disabled={soldOut} />
            <div className={styles.price}>
              {isAccordionOpen && <p className={styles.priceLabel}>{localTexts.from}</p>}
              <p className={styles.priceValue}>{helpers.formatNumber({ number: price, isCurrency: true, currency })}</p>
            </div>
        </div>
    </div>
  )
}
