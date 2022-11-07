import React, { FC } from 'react';
import cn from 'classnames';

import { ScoreBackground } from '../Icons';

import styles from './ButtonScore.module.scss';
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
