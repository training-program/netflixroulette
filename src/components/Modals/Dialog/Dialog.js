import React from 'react';
import withHiding from '@src/hoc/withHiding';
import styles from './Dialog.module.scss';
import { func, object, arrayOf, node, oneOfType } from 'prop-types';

const Dialog = ({ focusedRef, onClose, children }) => (
  <div className={styles.glass}>
    <div ref={focusedRef} className={styles.dialog}>
      <a className={styles.dialog__closeBtn} onClick={onClose} />
      {children}
    </div>
  </div>
);

Dialog.propTypes = {
  focusedRef: object.isRequired,
  onClose: func.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default withHiding(Dialog);
