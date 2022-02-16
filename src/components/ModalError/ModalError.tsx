import React from 'react';
import { ModalErrorProps } from './ModalError.types';
import styles from './ModalError.module.scss';

import Dialog from '../Dialog/Dialog';

const ModalError = ({ onClose, message = 'Oops, something went wrong.' }: ModalErrorProps) => (
  <Dialog onClose={onClose}>
    <div className={styles.errorBox}>{message}</div>
  </Dialog>
);

export default ModalError;
