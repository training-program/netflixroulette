import React from 'react';
import styles from './CheckboxOption.module.scss';

const CheckboxOption = ({ option, checked, onChange }) => (
  <li className={styles.dropDown__option}>
    <input
      id={option}
      type="checkbox"
      value={option}
      onChange={onChange}
      checked={checked}
      className={styles.dropDown__checkbox}
    />
    <label className={styles.dropDown__label} htmlFor={option}>
      {option}
    </label>
  </li>
);

export default CheckboxOption;
