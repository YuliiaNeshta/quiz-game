import React, { FC, useEffect, useState } from 'react';
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
  const [className, setClassName] = useState<string>('');
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const { money, quiz } = data;

  useEffect(() => {
    const allAreTrue = (answers: boolean[]): boolean => answers.every(answer => answer);
    setStartGame(allAreTrue(answers));

    setScore(money[questionIdx - 1]?.amount);
  }, [answers, score]);

  useEffect(() => {
    const quantityOfQuestions = quiz.length;

    if (quantityOfQuestions === questionIdx) {
      setStartGame(false);
    }
  }, [questionIdx]);

  const indexCurrentScore = money?.findIndex(step => step.amount === score);

  const handleTryAgainButton = () => {
    setStartGame(true);
    setQuestionIdx(0);
    setAnswers([]);
    setClassName('');
  };

  const handleClick = (answer: string, correctAnswer: string) => {
    setSelectedAnswer(answer);
    //Timeout it takes for buttons to show styles
    setTimeout(() => {
      setAnswers(prev => [...prev, answer === correctAnswer]);
    }, DELAY);

    setClassName(answer === correctAnswer ? 'success' : 'error');
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
            className={className}
            questionIdx={questionIdx}
            selectedAnswer={selectedAnswer}
          />
          <ScoreBoard data={money} questionIdx={questionIdx} indexCurrentScore={indexCurrentScore} />
        </div>
      ) : (
        <EndGame score={score} onClick={() => handleTryAgainButton()} />
      )}
    </>
  );
};

export default Game;
