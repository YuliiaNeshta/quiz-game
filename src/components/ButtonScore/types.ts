import { MouseEvent, ReactNode } from 'react';

export interface ButtonScoreProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => void;
}
