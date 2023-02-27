/* eslint react/jsx-props-no-spreading: 'off' */
import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import { EditorTextareaProps } from './EditorTextarea.types';

import FormField from '../FormField/FormField';

const EditorTextarea = ({ label, className, ...props }: EditorTextareaProps) => {
  const [field, { touched, error }] = useField(props);

  return (
    <FormField label={label} error={error} touched={touched}>
      <textarea
        {...field}
        className={classNames(className, 'bg-input opacity-80 rounded p-4')}
        {...props}
      />
    </FormField>
  );
};

export default EditorTextarea;
