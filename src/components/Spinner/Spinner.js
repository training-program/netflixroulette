import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = ({ fullscreen, className = '' }) => {
  const classes =
    (fullscreen ? styles.componentStub_fullscreen : styles.componentStub) + ' ' + className;

  return (
    <div className={classes}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
