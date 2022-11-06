import React, { FC, useEffect, useState } from 'react';
import Button from '../../components/Button';
import EndGame from '../EndGame';
import styles from './Game.module.scss';
import cn from 'classnames';
import { LETTERS } from '../../constants';

import data from '../../services/data.json';

const Game: FC = () => {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [className, setClassName] = useState('');
  const [score, setScore] = useState('0');

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
    setAnswers(prev => [...prev, answer === correctAnswer]);
    setClassName(answer === correctAnswer ? styles.success : styles.error);
    if (answer === correctAnswer) {
      setQuestionIdx(prevState => (prevState += 1));
    }
  };

  const handleTryAgainButton = () => {
    setStartGame(true);
    setQuestionIdx(0);
    setAnswers([]);
    setClassName('');
  };

  return (
    <>
      {startGame ? (
        <div className={styles.wrapper}>
          <div className={styles.questions}>
            {`Question index #${questionIdx}`}
            {quiz &&
              quiz.map(quiz => {
                return (
                  <div key={quiz.id} className={styles.quiz}>
                    {quiz.id === questionIdx + 1 && (
                      <div className={styles.quizWrapper}>
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
                  </div>
                );
              })}
          </div>
          <div className={styles.scores}>
            {money &&
              money.map(score => {
                return (
                  <Button
                    type="ghost"
                    size="small"
                    className={cn(styles.score, questionIdx === score.id ? styles.active : 'not')}
                    key={score.id}
                  >
                    {score.amount}
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
