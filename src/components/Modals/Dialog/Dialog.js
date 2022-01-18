import React from 'react';
import styles from './Dialog.module.scss';

const Dialog = props => {
  const handleClick = () => props.onClick();

  return (
    <div className={styles.glass}>
      <div className={styles.dialog}>
        <a className={styles.dialog__closeBtn} onClick={handleClick} />
        {props.children}
      </div>
    </div>
  );
};

export default Dialog;
