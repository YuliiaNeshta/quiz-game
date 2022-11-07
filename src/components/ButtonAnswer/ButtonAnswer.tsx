import React, { FC } from 'react';
import cn from 'classnames';
import { AnswerBackgroundLarge } from '../Icons';

import styles from './ButtonAnswer.module.scss';
import { ButtonAnswerProps } from './types';

const ButtonAnswer: FC<ButtonAnswerProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={cn(styles.button, styles[className])}
      // @ts-ignore
      onClick={onClick}
    >
      <AnswerBackgroundLarge className={styles.svg} />
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default ButtonAnswer;
