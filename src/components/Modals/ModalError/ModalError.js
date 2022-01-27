import React from 'react';
import styles from './ModalError.module.scss';
import PropTypes from 'prop-types';

import Dialog from '../Dialog/Dialog';

const ModalError = props => (
  <Dialog onClose={props.onClose}>
    <div className={styles.errorBox}>
      <span>{props.message}</span>
    </div>
  </Dialog>
);

ModalError.propTypes = {
  message: PropTypes.string,
};

ModalError.defaultProps = {
  message: 'Oops, something went wrong.',
};

export default ModalError;
