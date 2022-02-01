import React from 'react';
import { bool, string } from 'prop-types';

import styles from './Spinner.module.scss';

const Spinner = ({ fullscreen, className }) => {
  let classes = fullscreen ? styles.loaderWrapper_fullscreen : styles.loaderWrapper;

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

Spinner.propTypes = {
  fullscreen: bool,
  className: string,
};

Spinner.defaultProps = {
  fullscreen: false,
  className: '',
};

export default Spinner;
