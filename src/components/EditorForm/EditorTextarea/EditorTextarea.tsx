/* eslint react/jsx-props-no-spreading: 'off' */
import React from 'react';
import { useField } from 'formik';
import { EditorTextareaProps } from './EditorTextarea.types';

import FormField from '../FormField/FormField';

const EditorTextarea = ({ label, ...props }: EditorTextareaProps) => {
  const [field, { touched, error }] = useField(props);

  return (
    <FormField label={label} error={error} touched={touched}>
      <textarea {...field} {...props} />
    </FormField>
  );
};

export default EditorTextarea;
