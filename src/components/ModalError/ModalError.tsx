import React from 'react';
import styles from './ModalError.module.scss';

import Dialog from '../Dialog/Dialog';

type Props = {
  message?: string;
  onClose: () => void;
};

const ModalError = ({ onClose, message = 'Oops, something went wrong.' }: Props) => (
  <Dialog onClose={onClose}>
    <div className={styles.errorBox}>{message}</div>
  </Dialog>
);

export default ModalError;
