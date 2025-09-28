import cx, {Argument as ClassNameType} from 'classnames';
import { SIZES } from '@/utils/types';
import styles from './loadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: SIZES;
  className?: ClassNameType;
}

export default function LoadingSpinner({ size = SIZES.SMALL, className }: LoadingSpinnerProps) {
  return (
    <div className={cx(styles.loadingSpinner, styles[size], className)}>
      <div className={styles.loadingSpinnerInner} />
    </div>
  );
}
