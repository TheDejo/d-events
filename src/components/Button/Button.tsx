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
    ariaLabel?: string;
};
export const Button: React.FC<ButtonProps> = props => {
  const { className, title, variant = VARIANTS.PRIMARY, disabled, children, isLoading, ariaLabel, ...rest } = props;

  const buttonClass = cx(styles.button, className, {
    [styles.primary]: variant === VARIANTS.PRIMARY,
    [styles.secondary]: variant === VARIANTS.SECONDARY,
    [styles.tertiary]: variant === VARIANTS.TERTIARY,
  });

  return (
    <button 
      className={buttonClass} 
      type="button"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel || title}
      aria-disabled={disabled}
      {...rest}
    >
      {isLoading && <LoadingSpinner size={SIZES.SMALL} className={styles.loadingSpinner} />}
      {children ? children : title}
    </button>
  )
}