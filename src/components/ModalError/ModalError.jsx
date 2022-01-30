import React from 'react';
import { string, func } from 'prop-types';
import styles from './ModalError.module.scss';

import Dialog from '../Dialog/Dialog.jsx';

function ModalError({ onClose, message }) {
  return (
    <Dialog onClose={onClose}>
      <div className={styles.errorBox}>{message}</div>
    </Dialog>
  );
}

ModalError.propTypes = {
  message: string,
  onClose: func.isRequired,
};

ModalError.defaultProps = {
  message: 'Oops, something went wrong.',
};

export default ModalError;
