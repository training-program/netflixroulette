/* eslint react/jsx-props-no-spreading: 'off' */
import React from 'react';
import { useField } from 'formik';
import { EditorInputProps } from './EditorInput.types';

import FormField from '../FormField/FormField';

const EditorInput = ({ label, ...props }: EditorInputProps) => {
  const [{ value, ...field }, { touched, error }] = useField(props);

  return (
    <FormField label={label} error={error} touched={touched}>
      <input value={value ?? ''} {...field} {...props} />
    </FormField>
  );
};

export default EditorInput;
