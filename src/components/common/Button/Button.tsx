/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { ButtonProps } from './Botton.types';
import styles from './Button.module.css';

const Button = ({
  variant = 'primary',
  size = 'lg',
  children,
  className,
  ...props
}: ButtonProps) => (
  <button
    type="submit"
    className={classNames(styles.root, styles[variant], styles[size], className)}
    {...props}
  >
    {children}
  </button>
);

export default Button;
