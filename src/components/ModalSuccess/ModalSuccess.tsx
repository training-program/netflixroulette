import React from 'react';
import { ModalSuccessProps } from './ModalSuccess.types';
import styles from './ModalSuccess.module.scss';

import Dialog from '../Dialog/Dialog';

const ModalSuccess = ({ onClose, message }: ModalSuccessProps) => (
  <Dialog onClose={onClose}>
    <div className={styles.modal}>
      <svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="33" cy="33" r="32.5" fill="#F65261" stroke="#F65261" />
        <path
          d="M14 35.8347L24.1175 46L49 21"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <h1 className={styles.congrats}>CONGRATULATIONS !</h1>
      <span className={styles.description}>{message}</span>
    </div>
  </Dialog>
);

export default ModalSuccess;
