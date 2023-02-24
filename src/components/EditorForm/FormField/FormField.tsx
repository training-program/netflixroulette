import React from 'react';
import { FormFieldProps } from './FormField.types';

const FormField = ({ label, children, touched, error }: FormFieldProps) => (
  <div className="relative flex flex-col">
    <label className="uppercase font-semibold leading-5 tracking-wider text-primary mt-7 mb-3">
      {label}
    </label>
    {children}
    {touched && error && <span className="absolute text-sm -bottom-5 text-primary">{error}</span>}
  </div>
);

export default FormField;
