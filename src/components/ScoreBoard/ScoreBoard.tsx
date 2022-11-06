import React, { FC } from 'react';
import cn from 'classnames';

import Button from '../Button';

import styles from './ScoreBoard.module.scss';
import { ScoreBoardProps } from './types';

const ScoreBoard: FC<ScoreBoardProps> = ({ data, questionIdx, indexCurrentScore, className }) => {
  if (!data) return null;

  return (
    // @ts-ignore
    <div className={cn(styles.scores, styles[className])}>
      {data
        .map(score => {
          return (
            <Button
              type="ghost"
              size="small"
              className={cn(
                styles.score,
                questionIdx === score.id ? styles.active : '',
                score.id > 0 && score.id <= indexCurrentScore ? styles.pastScore : '',
              )}
              key={score.id}
            >
              {score.amount}
            </Button>
          );
        })
        .reverse()}
    </div>
  );
};

export default ScoreBoard;
