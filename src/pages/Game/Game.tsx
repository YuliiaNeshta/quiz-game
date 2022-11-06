import cn from 'classnames';
import React, { FC, Fragment, useEffect, useState } from 'react';
import Button from '../../components/Button';
import { DELAY, LETTERS } from '../../constants';

import data from '../../services/data.json';
import EndGame from '../EndGame';
import Main from '../Main';
import styles from './Game.module.scss';

const Game: FC = () => {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [className, setClassName] = useState('');
  const [score, setScore] = useState('0');
  const [futureScore, setFutureScore] = useState<string[]>([]);
  const [pastScore, setPastScore] = useState<string[]>([]);

  const [questionIdx, setQuestionIdx] = useState(0);

  const { money, quiz } = data;

  useEffect(() => {
    const allAreTrue = (answers: boolean[]): boolean => answers.every(answer => answer);
    setStartGame(allAreTrue(answers));
  }, [answers]);

  useEffect(() => {
    const currentMoney = money.find(money => money.id === questionIdx)?.amount;
    if (currentMoney) {
      setScore(currentMoney);
    }
  }, [questionIdx]);

  const handleClick = (answer: string, correctAnswer: string) => {
    setSelectedAnswer(answer);
    //The time it takes for buttons to show styles
    setTimeout(() => {
      setAnswers(prev => [...prev, answer === correctAnswer]);
    }, DELAY);

    setClassName(answer === correctAnswer ? styles.success : styles.error);
    if (answer === correctAnswer) {
      //The time it takes for buttons to show styles
      setTimeout(() => {
        setQuestionIdx(prevState => prevState + 1);
      }, DELAY);
    }
  };

  const handleTryAgainButton = () => {
    setStartGame(true);
    setQuestionIdx(0);
    setAnswers([]);
    setClassName('');
  };

  useEffect(() => {
    const quantityOfQuestions = quiz.length;

    if (quantityOfQuestions === questionIdx) {
      setStartGame(false);
    }
  }, [questionIdx]);

  useEffect(() => {
    const indexCurrentScore = money?.findIndex(step => step.amount === score);
    // @ts-ignore
    setFutureScore(money?.slice(0, indexCurrentScore));
    // @ts-ignore
    setPastScore(money?.slice(indexCurrentScore, money.length));
    console.log('indexCurrentScore', indexCurrentScore);
    console.log('pastScore', pastScore);
    console.log('SCORE', score);
    console.log('futureScore', futureScore);
  }, [score]);

  return (
    <>
      {startGame ? (
        <div className={styles.wrapper}>
          <div className={styles.questions}>
            {quiz &&
              quiz.map(quiz => {
                return (
                  <Fragment key={quiz.id}>
                    {quiz.id === questionIdx + 1 && (
                      <div className={styles.quizInner}>
                        <h2 className={styles.title}>{quiz.question}</h2>
                        <div className={styles.answers}>
                          {quiz.answers &&
                            quiz.answers.map((answer, idx) => {
                              return (
                                <button
                                  key={answer}
                                  className={cn(styles.button, answer === selectedAnswer ? className : '')}
                                  onClick={() => handleClick(answer, quiz.correct_answer)}
                                >
                                  <span className={styles.letter}>{LETTERS[idx]}</span>
                                  {answer}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              })}
          </div>
          <div className={styles.scores}>
            {/*{money &&*/}
            {/*  money.map(score => {*/}
            {/*    return (*/}
            {/*      <Button*/}
            {/*        type="ghost"*/}
            {/*        size="small"*/}
            {/*        className={cn(styles.score, questionIdx === score.id ? styles.active : '')}*/}
            {/*        key={score.id}*/}
            {/*      >*/}
            {/*        {score.amount}*/}
            {/*      </Button>*/}
            {/*    );*/}
            {/*  })}*/}
            {futureScore &&
              futureScore.map(futureScore => {
                return (
                  <Button
                    type="ghost"
                    size="small"
                    className={cn(styles.score, questionIdx === futureScore.id ? styles.active : '')}
                    key={futureScore.id}
                  >
                    {futureScore.amount}
                  </Button>
                );
              })}
            {/*<Button type="ghost" size="small" className={cn(styles.score, styles.active)}>*/}
            {/*  {score}*/}
            {/*</Button>*/}
            {pastScore &&
              pastScore.map(pastScore => {
                return (
                  <Button
                    type="ghost"
                    size="small"
                    className={cn(styles.score, styles.pastScore, questionIdx === pastScore.id ? styles.active : '')}
                    key={pastScore.id}
                  >
                    {pastScore.amount}
                  </Button>
                );
              })}
          </div>
        </div>
      ) : (
        <EndGame score={score} onClick={() => handleTryAgainButton()} />
      )}
    </>
  );
};

export default Game;
