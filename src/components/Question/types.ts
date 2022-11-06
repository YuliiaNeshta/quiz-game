type Data = {
  id: number;
  question: string;
  answers: string[] | number[];
  correct_answer: string | number;
};

export interface QuestionProps {
  data: Data[];
  className: string;
  questionIdx: number;
  selectedAnswer: string | number;
  onClick: (answer: string, correctAnswer: string) => void;
}
