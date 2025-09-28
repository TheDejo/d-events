'use client';
import { PageComponentContainer } from '@/components/PageComponentContainer/PageComponentContainer';
import styles from './page.module.scss';
import EventCard from '@/components/EventCard/EventCard';
import SearchInput from '@/components/SearchInput/SearchInput';
import { Button } from '@/components/Button/Button';
import { SIZES, VARIANTS } from '@/utils/types';
import { useEventsContext } from '@/utils/context/EventsContext';
import localTexts from './home.texts.json';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';


export default function Home() {
  const { data, isLoading } = useEventsContext();
  const events  = data?.map((event) => ({
    title: event.name,
    location: event.location.state,
    price: event.price || 0,
    venue: event.venue,
    soldOut: event.sold_out,
    currency: event.currency,
    featured: event.featured,
    status: event.status,
    saleStartDate: event.sale_start_date,
    id: event.id,
    description: event.description,
    lineup: event.lineup,
    eventImage: {
      alt: event.name,
      landscape: event.event_images.landscape,
      square: event.event_images.square,
    },
    tickets: event.ticket_types.map((ticket) => ({
      name: ticket.name,
      price: ticket.price.total,
      soldOut: ticket.sold_out,
    })),
    date: new Date(event.date),
    appleMusicTracks: event.apple_music_tracks,
    spotifyTracks: event.spotify_tracks,
  }));
  return (
    <PageComponentContainer className={styles.homePage}>
      <section className={styles.events}>
        <div className={styles.searchInputContainer}>
          <SearchInput />
        </div>
        <div>
          <h1 className={styles.heading}>{localTexts.heading}</h1>
        </div>
        <div className={styles.eventsContainer}>
          {events?.map((event) => (
            <EventCard 
            key={event.id} 
            {...event}
            />
          ))}
        </div>

        <div className={styles.loadMoreButton}>
            {isLoading ? <LoadingSpinner size={SIZES.LARGE} /> : <Button title={localTexts.loadMore} variant={VARIANTS.TERTIARY} />}
        </div>
      </section>
    </PageComponentContainer> 
  );  
}