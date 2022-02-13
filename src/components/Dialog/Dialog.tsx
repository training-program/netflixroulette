import * as React from 'react';
import useHiding from '@src/hooks/useHiding';
import styles from './Dialog.module.scss';

import Cross from '../Cross/Cross';

type Props = {
  onClose: (event: React.SyntheticEvent | Event) => void;
  children: React.ReactNode;
};

const Dialog = ({ onClose, children }: Props) => {
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
