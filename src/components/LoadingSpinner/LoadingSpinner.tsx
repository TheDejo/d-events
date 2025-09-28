import cx from 'classnames';
import { SIZES } from '@/utils/types';
import styles from './loadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: SIZES;
}

export default function LoadingSpinner({ size = SIZES.SMALL }: LoadingSpinnerProps) {
  return (
    <div className={cx(styles.loadingSpinner, styles[size])}>
      <div className={styles.loadingSpinnerInner} />
    </div>
  );
}
