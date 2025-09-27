import React from 'react';
import cx, { Argument as ClassNameType } from 'classnames';
import styles from './pageComponentContainer.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: ClassNameType;
  styleWrapper?: ClassNameType;
}

export const PageComponentContainer = ({ children, className, styleWrapper }: IProps) => {
  return (
    <main className={cx(styles.outerComponent, styleWrapper)}>
      <div className={cx(styles.component, className)}>{children}</div>
    </main>
  );
};
