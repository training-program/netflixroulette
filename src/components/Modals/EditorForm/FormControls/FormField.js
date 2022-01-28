import React from 'react';
import { string, bool } from 'prop-types';
import styles from './FormField.module.scss';

const FormField = ({ label, children, touched, error }) => (
  <div className={styles.field}>
    <label className={styles.field__label}>{label}</label>
    {children}
    {touched && error && <span className={styles.field__warn}>{error}</span>}
  </div>
);

FormField.propTypes = {
  label: string,
  touched: bool,
  error: string,
};

export default FormField;
