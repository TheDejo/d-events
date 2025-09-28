import React from 'react'
import cx from 'classnames';
import styles from './button.module.scss';
import { SIZES, VARIANTS } from '@/utils/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    variant?: VARIANTS;
    isDashboard?: boolean;
    children?: React.ReactNode;
    isLoading?: boolean;
};
export const Button: React.FC<ButtonProps> = props => {
  const { className, title, variant = VARIANTS.PRIMARY, disabled, children, isLoading, ...rest } = props;

  const buttonClass = cx(styles.button, className, {
    [styles.primary]: variant === VARIANTS.PRIMARY,
    [styles.secondary]: variant === VARIANTS.SECONDARY,
    [styles.tertiary]: variant === VARIANTS.TERTIARY,
  });

  return (
    <button className={buttonClass} {...rest} disabled={disabled}>
      {isLoading && <LoadingSpinner size={SIZES.SMALL} className={styles.loadingSpinner} />}
      {children ? children : title}
    </button>
  )
}