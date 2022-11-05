import { ReactNode, MouseEvent } from 'react';

export type Type = 'fill' | 'ghost';
export type Size = 'small' | 'normal';

export interface ButtonProps {
  type: Type;
  size?: Size;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: (event: MouseEvent) => void;
}
