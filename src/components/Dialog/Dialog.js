import React from 'react';
import { func } from 'prop-types';
import { Children, RefProp } from '@src/types/';
import withHiding from '@src/hoc/withHiding';
import styles from './Dialog.module.scss';

import Cross from '../Cross/Cross';

const Dialog = ({ focusedRef, onClose, children }) => (
  <div className={styles.glass}>
    <div ref={focusedRef} className={styles.dialog}>
      <button type="button" className={styles.dialog__closeBtn} onClick={onClose}>
        <Cross side="22" />
      </button>
      {children}
    </div>
  </div>
);

Dialog.propTypes = {
  focusedRef: RefProp.isRequired,
  onClose: func.isRequired,
  children: Children.isRequired,
};

export default withHiding(Dialog);
