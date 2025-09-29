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

const CURRENCY_DIVISOR = 100;


export default function Home() {
  const { data, isLoading, venue, loadMore, hasMore, isFetchingMore } = useEventsContext();
  const events  = data?.map((event) => ({
    title: event.name,
    location: event.location.state,
    price: event.ticket_types[0].price.face_value / CURRENCY_DIVISOR || 0, // Using this price because the 'price' field is always null
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
      <main role="main" aria-label={localTexts.mainContent}>
        <section className={styles.events} aria-labelledby="events-heading">
          <div className={styles.searchInputContainer} role="search" aria-label={localTexts.searchSection}>
            <SearchInput />
          </div>
          <div>
            <h1 id="events-heading" className={styles.heading}>{localTexts.heading.replace('{venue}', `${venue ? `${localTexts.at} ${venue}` : ''}`)}</h1>
          </div>
          <div 
            className={styles.eventsContainer}
            role="region"
            aria-label={localTexts.eventsList}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {events && events.length > 0 ? (
              events.map((event) => (
                <EventCard 
                key={event.id} 
                {...event}
                />
              ))
            ) : !isLoading ? (
              <div className={styles.noEvents} role="status" aria-live="polite">
                <h3>{localTexts.noEvents}</h3>
                <p>{venue ? localTexts.noEventsForVenue.replace('{venue}', venue) : localTexts.noEvents}</p>
              </div>
            ) : null}
          </div>

          <div className={styles.loadMoreButton}>
              {isLoading ? (
                <div role="status" aria-live="polite" aria-label={localTexts.loadingEvents}>
                  <LoadingSpinner size={SIZES.LARGE} />
                </div>
              ) : hasMore ? (
                <Button 
                  title={localTexts.loadMore} 
                  variant={VARIANTS.SECONDARY} 
                  onClick={loadMore}
                  isLoading={isFetchingMore}
                />
              ) : null}
          </div>
        </section>
      </main>
    </PageComponentContainer> 
  );  
}