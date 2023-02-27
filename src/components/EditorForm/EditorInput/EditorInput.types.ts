import { ComponentProps } from 'react';

export type EditorInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
} & ComponentProps<'input'>;
