import React, { Component } from 'react';
import styles from './CheckList.module.scss';
import { string, object, bool, func, arrayOf, objectOf } from 'prop-types';

import withShowToggling from 'Utils/hoc/withShowToggling';

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
        {options.map(option => (
          <CheckboxOption
            option={option}
            key={option}
            checked={values[option]}
            onChange={onChange}
          />
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
  focusedRef: object.isRequired,
  showElement: bool.isRequired,
};

export default withShowToggling(Checklist);
