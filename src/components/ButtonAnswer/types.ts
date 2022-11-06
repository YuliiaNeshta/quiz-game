import { ReactNode } from 'react';

export interface ButtonAnswerProps {
  className: string;
  children: ReactNode;
  onClick: (answer: string, correctAnswer: string) => void;
}
