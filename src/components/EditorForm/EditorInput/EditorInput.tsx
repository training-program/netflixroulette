/* eslint react/jsx-props-no-spreading: 'off' */
import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import { EditorInputProps } from './EditorInput.types';
import styles from './EditorInput.module.css';
import FormField from '../FormField/FormField';

const EditorInput = ({ label, className, type, ...props }: EditorInputProps) => {
  const [{ value, ...field }, { touched, error }] = useField(props);

  return (
    <FormField label={label} error={error} touched={touched}>
      <input
        required
        value={value ?? ''}
        {...field}
        {...props}
        type={type}
        className={classNames(className, styles.root, styles[type])}
      />
    </FormField>
  );
};

export default EditorInput;
