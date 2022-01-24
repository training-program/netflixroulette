import React from 'react';
import withHiding from 'Utils/hoc/withHiding';
import styles from './Dialog.module.scss';

const Dialog = props => (
  <div className={styles.glass}>
    <div ref={props.focusedRef} className={styles.dialog}>
      <a className={styles.dialog__closeBtn} onClick={props.onClose} />
      {props.children}
    </div>
  </div>
);

export default withHiding(Dialog);
