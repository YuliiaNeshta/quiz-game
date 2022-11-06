type Data = {
  amount: string;
  id: number;
};

export interface ScoreBoardProps {
  data: Data[];
  questionIdx: number;
  indexCurrentScore: number;
}
