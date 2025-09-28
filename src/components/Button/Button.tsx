import React from 'react'
import cx from 'classnames';
import styles from './button.module.scss';
import { VARIANTS } from '@/utils/types';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    variant?: VARIANTS;
    isDashboard?: boolean;
    children?: React.ReactNode;
};
export const Button: React.FC<ButtonProps> = props => {
  const { className, title, variant = VARIANTS.PRIMARY, disabled, children, ...rest } = props;

  const buttonClass = cx(styles.button, className, {
    [styles.primary]: variant === VARIANTS.PRIMARY,
    [styles.secondary]: variant === VARIANTS.SECONDARY,
    [styles.tertiary]: variant === VARIANTS.TERTIARY,
  });

  return (
    <button className={buttonClass} {...rest} disabled={disabled}>
      {children ? children : title}
    </button>
  )
}