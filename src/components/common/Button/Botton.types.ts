import { ComponentProps } from 'react';

export type ButtonProps = {
  variant?: 'primary' | 'outlined' | 'ghost';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  className?: string;
} & Omit<ComponentProps<'button'>, 'className' | 'disabled'>;
