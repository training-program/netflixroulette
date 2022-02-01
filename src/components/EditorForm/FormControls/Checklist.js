import React from 'react';
import {
  string, bool, func, arrayOf, objectOf,
} from 'prop-types';
import { RefProp } from '@src/types';

import withShowToggling from '@src/hoc/withShowToggling';
import styles from './Checklist.module.scss';

const Checklist = ({
  options,
  values,
  name,
  placeholder,
  onChange,
  onToggle,
  focusedRef,
  showElement,
}) => (
  <div ref={focusedRef} className={styles.dropDown}>
    <button
      className={showElement ? styles.dropDown__btn_open : styles.dropDown__btn}
      type="button"
      name={name}
      onClick={onToggle}
    >
      {placeholder}
    </button>
    {showElement && (
      <ul className={styles.dropDown__list}>
        {options.map((option) => (
          <li key={option} className={styles.dropDown__option}>
            <input
              type="checkbox"
              id={option}
              value={option}
              onChange={onChange}
              checked={values[option]}
              className={styles.dropDown__checkbox}
            />
            <label className={styles.dropDown__label} htmlFor={option}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    )}
  </div>
);

Checklist.propTypes = {
  options: arrayOf(string).isRequired,
  values: objectOf(bool).isRequired,
  name: string.isRequired,
  placeholder: string.isRequired,
  onChange: func.isRequired,
  onToggle: func.isRequired,
  focusedRef: RefProp.isRequired,
  showElement: bool.isRequired,
};

export default withShowToggling(Checklist);
