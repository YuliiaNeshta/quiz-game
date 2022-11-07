import cn from 'classnames';
import React, { FC } from 'react';
import styles from './ButtonScore.module.scss';
import { ScoreBackground } from '../Icons';
import { ButtonScoreProps } from './types';

const ButtonScore: FC<ButtonScoreProps> = ({ children, className, onClick }) => {
  return (
    // @ts-ignore
    <button className={cn(styles.button, styles[className])} onClick={onClick}>
      <ScoreBackground className={styles.svg} />
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default ButtonScore;
