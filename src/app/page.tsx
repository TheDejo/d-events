import { PageComponentContainer } from '@/components/PageComponentContainer/PageComponentContainer';
import styles from './page.module.scss';
import { Button } from '@/components/Button/Button';
import { Tag } from '@/components/Tag/Tag';
import { TAG_TYPES } from '@/utils/types';


export default function Home() {
  return (
    <PageComponentContainer className={styles.homePage}>
      <Button title="Get reminded"/>
      <Tag type={TAG_TYPES.ON_SALE} text="On Sale" />
    </PageComponentContainer>
  );
}