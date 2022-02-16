import React from 'react';
import { FormFieldProps } from './FormField.types';
import styles from './FormField.module.scss';

const FormField = ({
  label, children, touched, error,
}: FormFieldProps) => (
  <div className={styles.field}>
    <label className={styles.field__label}>{label}</label>
    {children}
    {touched && error && <span className={styles.field__warn}>{error}</span>}
  </div>
);

export default FormField;
