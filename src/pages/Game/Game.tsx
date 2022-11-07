import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { Burger, Close } from '../../components/Icons';
import Question from '../../components/Question';
import ScoreBoard from '../../components/ScoreBoard';
import { DELAY } from '../../constants';
import data from '../../services/data.json';
import EndGame from '../EndGame';

import styles from './Game.module.scss';

const Game: FC = () => {
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [score, setScore] = useState<string>('0');
  const [classNameForActiveAnswer, setClassNameForActiveAnswer] = useState<string>('');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const [showScoreMobile, setShowScoreMobile] = useState<boolean>(false);

  const { money, quiz } = data;

  useEffect(() => {
    const allAreTrue = (answers: boolean[]): boolean => answers.every(answer => answer);
    setStartGame(allAreTrue(answers));
    if (questionIdx > 0) {
      setScore(money[questionIdx - 1]?.amount);
    }
  }, [questionIdx, answers]);

  useEffect(() => {
    const quantityOfQuestions = quiz.length;

    if (quantityOfQuestions === questionIdx) {
      setStartGame(false);
    }
  }, [questionIdx]);

  const handleTryAgainButton = () => {
    setStartGame(true);
    setQuestionIdx(0);
    setAnswers([]);
    setClassNameForActiveAnswer('');
    setScore('0');
  };

  const handleClick = (answer: string, correctAnswer: string) => {
    setSelectedAnswer(answer);

    //Timeout for buttons to show styles
    setTimeout(() => {
      setAnswers(prev => [...prev, answer === correctAnswer]);
    }, DELAY);

    setClassNameForActiveAnswer(answer === correctAnswer ? 'success' : 'error');

    if (answer === correctAnswer) {
      //Timeout for buttons to show styles
      setTimeout(() => {
        setQuestionIdx(prevState => prevState + 1);
      }, DELAY);
    }
  };

  return (
    <>
      {startGame ? (
        <div className={styles.wrapper}>
          <Question
            data={quiz}
            onClick={handleClick}
            className={classNameForActiveAnswer}
            questionIdx={questionIdx}
            selectedAnswer={selectedAnswer}
          />
          {showScoreMobile ? (
            <Close className={styles.close} onClick={() => setShowScoreMobile(false)} />
          ) : (
            <Burger className={styles.burger} onClick={() => setShowScoreMobile(true)} />
          )}
          <ScoreBoard className={cn(showScoreMobile ? 'show' : 'hide')} data={money} questionIdx={questionIdx} />
        </div>
      ) : (
        <EndGame score={score} onClick={() => handleTryAgainButton()} />
      )}
    </>
  );
};

export default Game;
