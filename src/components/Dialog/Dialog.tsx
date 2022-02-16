import React from 'react';
import useHiding from '@src/hooks/useHiding';
import { DialogProps } from './Dialog.types';
import styles from './Dialog.module.scss';

import Cross from '../Cross/Cross';

const Dialog = ({ onClose, children }: DialogProps) => {
  const focusedElementRef = useHiding(onClose);

  return (
    <div className={styles.glass}>
      <div ref={focusedElementRef} className={styles.dialog}>
        <button type="button" className={styles.dialog__closeBtn} onClick={onClose}>
          <Cross side="22" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
