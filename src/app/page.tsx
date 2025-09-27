import { PageComponentContainer } from '@/components/PageComponentContainer/PageComponentContainer';
import styles from './page.module.scss';

export default function Home() {
  return (
    <PageComponentContainer className={styles.homePage}>
      <h1>Welcome to D events</h1>
    </PageComponentContainer>
  );
}