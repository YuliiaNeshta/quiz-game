import React, { FC } from 'react';
import cn from 'classnames';

import ButtonScore from '../ButtonScore';

import styles from './ScoreBoard.module.scss';
import { ScoreBoardProps } from './types';

const ScoreBoard: FC<ScoreBoardProps> = ({ data, questionIdx, className }) => {
  if (!data) return null;

  return (
    // @ts-ignore
    <div className={cn(styles.scores, styles[className])}>
      {data
        .map((score, idx) => {
          return (
            <ButtonScore
              className={cn(styles.score, {
                ['active']: questionIdx === idx,
                ['pastScore']: idx < questionIdx,
              })}
              key={score.id}
            >
              ${score.amount}
            </ButtonScore>
          );
        })
        .reverse()}
    </div>
  );
};

export default ScoreBoard;
