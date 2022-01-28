import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = ({ fullscreen, className = '' }) => {
  const { loaderWrapper, loaderWrapper_fullscreen } = styles;
  const classes = fullscreen ? loaderWrapper_fullscreen : loaderWrapper;

  if (className) classes += ` ${className}`;

  return (
    <div className={classes}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
