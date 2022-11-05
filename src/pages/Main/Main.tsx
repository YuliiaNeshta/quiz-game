import React, { FC } from 'react';
import Button from '../../components/Button';

import styles from './Main.module.scss';
import hand from '../../assests/icons/hand.svg';

const Main: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroImage}>
        <img src={hand} alt="like-hand" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Who wants to be a&nbsp;millionaire?</h1>
        <Button type="fill">Start</Button>
      </div>
    </div>
  );
};

export default Main;
