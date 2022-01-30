import React from 'react';
import { string, bool } from 'prop-types';
import { Children } from '@src/types/';
import styles from './FormField.module.scss';

function FormField({
  label, children, touched, error,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.field__label}>{label}</label>
      {children}
      {touched && error && <span className={styles.field__warn}>{error}</span>}
    </div>
  );
}

FormField.propTypes = {
  label: string.isRequired,
  touched: bool.isRequired,
  error: string.isRequired,
  children: Children.isRequired,
};

export default FormField;
