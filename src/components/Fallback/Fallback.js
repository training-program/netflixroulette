import React from 'react';
import styles from './Fallback.module.scss';

const Fallback = () => {
  return (
    <div className={styles.componentStub}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Fallback;
