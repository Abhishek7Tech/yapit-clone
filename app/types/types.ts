export type LessonsList = {
  group: number;
  lesson: number;
  disabled: boolean;
  completed: boolean;
  language: string;
}[];

export type Questions = {
  id: number;
  total: number;
  currentQuestion: {
    index: number;
    term: string;
    translation: string;
    example: string;
    answered: boolean;
  };
};

export type GradesData = {
  title: string;
  score: number;
  feedback: string;
  grade: string;
  remarks: string[];
};
