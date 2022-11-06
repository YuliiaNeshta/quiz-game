import cn from 'classnames';
import React, { FC, Fragment } from 'react';

import { LETTERS } from '../../constants';
import ButtonAnswer from '../ButtonAnswer';

import styles from './Question.module.scss';
import { QuestionProps } from './types';

const Question: FC<QuestionProps> = ({ data, questionIdx, selectedAnswer, onClick, className }) => {
  if (!data) return null;

  return (
    <div className={styles.questions}>
      {data.map(quiz => {
        return (
          <Fragment key={quiz.id}>
            {quiz.id === questionIdx + 1 && (
              <div className={styles.quizInner}>
                <h2 className={styles.title}>{quiz.question}</h2>

                <div className={styles.answers}>
                  {quiz.answers &&
                    quiz.answers.map((answer, idx) => {
                      return (
                        <ButtonAnswer
                          key={answer}
                          className={cn(styles.button, answer === selectedAnswer ? className : '')}
                          // @ts-ignore
                          onClick={() => onClick(answer, quiz.correct_answer)}
                        >
                          <span className={styles.letter}>{LETTERS[idx]}</span>
                          {answer}
                        </ButtonAnswer>
                      );
                    })}
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Question;
