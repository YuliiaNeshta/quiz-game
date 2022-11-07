import React, { FC } from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.scss';
import cn from 'classnames';

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button className={cn(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
