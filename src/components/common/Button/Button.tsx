/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { ComponentProps } from 'react';
import styles from './Button.module.css';

// type ButtonProps = {
//     primary: boolean;
//     size: 'small' | 'medium' |'large';
//     backgroundColor: string;
//     label: string
// }

type ButtonProps = {
  variant?: 'primary' | 'outlined' | 'ghost';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
} & Omit<ComponentProps<'button'>, 'className' | 'disabled'>;

const Button = ({ variant = 'primary', size = 'lg', children, ...props }: ButtonProps) => {
  const className = classNames(styles.root, styles[variant], styles[size]);

  return (
    <button type="submit" className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
