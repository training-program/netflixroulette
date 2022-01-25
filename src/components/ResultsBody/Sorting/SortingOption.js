import React from 'react';
import { func, string } from 'prop-types';
import styles from './Sorting.module.scss';

const SortingOption = ({ option, onClick }) => (
  <li className={styles.dropDown__option} onClick={onClick}>
    {option}
  </li>
);

SortingOption.propTypes = {
  option: string.isRequired,
  onClick: func.isRequired,
};

export default SortingOption;
