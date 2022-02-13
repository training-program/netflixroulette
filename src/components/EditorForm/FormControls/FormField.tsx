import React from 'react';
import styles from './FormField.module.scss';

type Props = {
  label: string;
  children: React.ReactNode;
  touched: boolean;
  error: string;
};

const FormField = ({
  label, children, touched, error,
}: Props) => (
  <div className={styles.field}>
    <label className={styles.field__label}>{label}</label>
    {children}
    {touched && error && <span className={styles.field__warn}>{error}</span>}
  </div>
);

export default FormField;
