import { PageComponentContainer } from '@/components/PageComponentContainer/PageComponentContainer';
import styles from './page.module.scss';
import EventCard from '@/components/EventCard/EventCard';


export default function Home() {
  return (
    <PageComponentContainer className={styles.homePage}>
      <section className={styles.events}>
        <EventCard 
          title="Jack and the Beanstalk"
          location="London, UK"
          imgSrc="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=320&h=320&fit=crop&crop=center"
          imgAlt="Event Image"
          date={new Date()}
          price={100}
          facility="The Waiting Room"
          lineup={{
            name: ['Ben Hayes', 'Jungle', 'Cory Henry'],
            curfew: new Date()
          }}
          tickets={[{
            name: 'Main Hall standing',
            price: 100,
            soldOut: false
          },{
            name: 'Balcony',
            price: 100,
            soldOut: true
          }]}
          description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </section>
    </PageComponentContainer>
  );
}