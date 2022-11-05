import React, { FC } from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.scss';
import cn from 'classnames';

const Button: FC<ButtonProps> = ({ children, size = 'normal', type = 'fill', className, disabled, onClick }) => {
  return (
    <button
      className={cn(
        styles.button,
        size === 'small' ? styles.small : '',
        type === 'fill' ? styles.fill : '',
        type === 'ghost' ? styles.ghost : '',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
