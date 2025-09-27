import { PageComponentContainer } from '@/components/PageComponentContainer/PageComponentContainer';
import styles from './page.module.scss';
import { Button } from '@/components/Button/Button';
import { Tag } from '@/components/Tag/Tag';
import { TAG_TYPES } from '@/utils/types';
import Accordion from '@/components/Accordion/Accordion';


export default function Home() {
  return (
    <PageComponentContainer className={styles.homePage}>
      <Button title="Get reminded"/>
      <Tag type={TAG_TYPES.ON_SALE} text="On Sale" />
      <Accordion title="More info">
        <p>Accordion content</p>
      </Accordion>
    </PageComponentContainer>
  );
}