import React, { FC } from 'react';
import hand from '../../assests/images/hand.svg';
import Button from '../../components/Button';
import styles from './EndGame.module.scss';
import { EndGameProps } from './types';

const EndGame: FC<EndGameProps> = ({ score, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <img src={hand} alt="like-hand" />
      <div className={styles.result}>
        <p className={styles.totalText}>Total score:</p>
        <p className={styles.score}>${score} earned</p>
        <Button type="fill" onClick={onClick}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default EndGame;
