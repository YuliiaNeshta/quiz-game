import cn from 'classnames';
import React, { FC, Fragment, useEffect, useState } from 'react';
import Button from '../../components/Button';
import { DELAY, LETTERS } from '../../constants';

import data from '../../services/data.json';
import EndGame from '../EndGame';
import styles from './Game.module.scss';

const Game: FC = () => {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [className, setClassName] = useState('');
  const [score, setScore] = useState('0');

  const [questionIdx, setQuestionIdx] = useState(0);

  const { money, quiz } = data;

  const indexCurrentScore = money?.findIndex(step => step.amount === score);

  useEffect(() => {
    const allAreTrue = (answers: boolean[]): boolean => answers.every(answer => answer);
    setStartGame(allAreTrue(answers));
    setScore(money[questionIdx - 1]?.amount);
  }, [answers]);

  const handleClick = (answer: string, correctAnswer: string) => {
    setSelectedAnswer(answer);
    //Timeout it takes for buttons to show styles
    setTimeout(() => {
      setAnswers(prev => [...prev, answer === correctAnswer]);
    }, DELAY);

    setClassName(answer === correctAnswer ? styles.success : styles.error);
    if (answer === correctAnswer) {
      //Timeout for buttons to show styles
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
            {money &&
              money
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
        </div>
      ) : (
        <EndGame score={score} onClick={() => handleTryAgainButton()} />
      )}
    </>
  );
};

export default Game;
