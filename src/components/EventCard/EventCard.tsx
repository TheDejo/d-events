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
import { kebabCase } from 'lodash';
import Link from 'next/link';

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
  const titleId = kebabCase(title);
  
  return (
    <article className={styles.eventCard} aria-labelledby={`event-title-${titleId}`}>
      <div className={styles.eventCardHeader}>
         <div className={cx(styles.eventCardImageContainer, { [styles.isAccordionOpen]: isAccordionOpen })}>
             <Image 
               src={isAccordionOpen ? eventImage.landscape : eventImage.square} 
               alt={localTexts.eventImage.replace('{title}', title)} 
               className={styles.eventCardImage} 
               fill
               priority={true}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             />
              <div className={styles.imageFooter}>
               {hasTracks && (
                 <Link 
                   href={appleMusicTracks?.[0]?.open_url || spotifyTracks?.[0]?.open_url || ''}
                   target="_blank"
                   aria-label={localTexts.playMusic}
                 >
                   <PlayIcon />
                 </Link>
               )}
               {featured || status === STATUS.ON_SALE && <Tag type={featured ? TAG_TYPES.FEATURED : TAG_TYPES.ON_SALE} text={localTexts.onSale.replace('{date}', helpers.formatDate(saleDate))} />}
               </div>
         </div>
        <div className={styles.textBox}>
          <time className={styles.date} dateTime={date.toISOString()}>
            {helpers.formatEventDateTime(date)}
          </time>
          <h2 id={`event-title-${titleId}`} className={styles.title}>{title}</h2>
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
            <div className={styles.accordionBody} role="region" aria-label={localTexts.eventDetails.replace('{title}', title)}>
              <p className={styles.description}>{description}</p>
              <div className={styles.lineupSection} role="region" aria-labelledby={`lineup-${titleId}`}>
                <h4 id={`lineup-${titleId}`} className={styles.accordionSectionTitle}>{localTexts.lineup}</h4>
                {lineup.map((lineup, index) => (
                  <p key={index}>{lineup.details} {lineup.time && <span className={styles.lineupTimeValue}>— {lineup.time}</span>}</p>
                ))}
              </div>
              <div className={styles.ticketsSection} role="region" aria-labelledby={`tickets-${titleId}`}>
                <h4 id={`tickets-${titleId}`} className={styles.accordionSectionTitle}>{localTexts.tickets}</h4>
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
            <Button 
              title={soldOut ? localTexts.soldOut : localTexts.ctaOne} 
              disabled={soldOut}
              aria-label={soldOut ? `${localTexts.soldOut} - ${title}` : `${localTexts.ctaOne} for ${title}`}
            />
            <div className={styles.price} role="text" aria-label={isAccordionOpen ? localTexts.priceFrom.replace('{price}', helpers.formatNumber({ number: price, isCurrency: true, currency })) : helpers.formatNumber({ number: price, isCurrency: true, currency })}>
              {isAccordionOpen && <p className={styles.priceLabel} aria-hidden="true">{localTexts.from}</p>}
              <p className={styles.priceValue} aria-hidden="true">{helpers.formatNumber({ number: price, isCurrency: true, currency })}</p>
            </div>
        </div>
    </article>
  )
}
