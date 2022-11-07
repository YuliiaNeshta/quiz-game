type Data = {
  amount: string;
  id: number;
};

export interface ScoreBoardProps {
  data: Data[];
  questionIdx: number;
  className?: string | undefined;
}
