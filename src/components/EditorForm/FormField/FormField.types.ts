import { ReactNode } from 'react';

export type FormFieldProps = {
  label: string;
  children: ReactNode;
  touched: boolean;
  error: string;
};
