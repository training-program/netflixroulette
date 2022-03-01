import React from 'react';
import { SpinnerProps } from './Spinner.types';
import styles from './Spinner.module.scss';

const Spinner = ({ fullscreen = false, className = '' }: SpinnerProps) => {
  let classes = fullscreen ? styles.loaderWrapper_fullscreen : styles.loaderWrapper;

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
