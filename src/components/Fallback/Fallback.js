import React from 'react';
import styles from './Fallback.module.scss';

const Fallback = ({ fullscreen }) => {
  return (
    <div className={fullscreen ? styles.componentStub_fullscreen : styles.componentStub}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Fallback;
