import { type CategoryId } from './category';

export interface SurveyQuestion {
  id: number;
  question: string;
}

export const SURVEY_OPTIONS = [
  { value: 1, label: '전혀 아니다' },
  { value: 2, label: '조금 아니다' },
  { value: 3, label: '보통' },
  { value: 4, label: '약간 그렇다' },
  { value: 5, label: '매우 그렇다' },
] as const;

export const SURVEY_QUESTIONS: Record<CategoryId, SurveyQuestion[]> = {
  // TODO: id 실제 값으로 변경
  pm: [
    { id: 1, question: 'PM 질문 1' },
    { id: 2, question: 'PM 질문 2' },
    { id: 3, question: 'PM 질문 3' },
    { id: 4, question: 'PM 질문 4' },
    { id: 5, question: 'PM 질문 5' },
    { id: 6, question: 'PM 질문 6' },
    { id: 7, question: 'PM 질문 7' },
    { id: 8, question: 'PM 질문 8' },
    { id: 9, question: 'PM 질문 9' },
    { id: 10, question: 'PM 질문 10' },
  ],
  de: [
    { id: 1, question: 'DE 질문 1' },
    { id: 2, question: 'DE 질문 2' },
    { id: 3, question: 'DE 질문 3' },
    { id: 4, question: 'DE 질문 4' },
    { id: 5, question: 'DE 질문 5' },
    { id: 6, question: 'DE 질문 6' },
    { id: 7, question: 'DE 질문 7' },
    { id: 8, question: 'DE 질문 8' },
    { id: 9, question: 'DE 질문 9' },
    { id: 10, question: 'DE 질문 10' },
  ],
  fe: [
    { id: 1, question: 'FE 질문 1' },
    { id: 2, question: 'FE 질문 2' },
    { id: 3, question: 'FE 질문 3' },
    { id: 4, question: 'FE 질문 4' },
    { id: 5, question: 'FE 질문 5' },
    { id: 6, question: 'FE 질문 6' },
    { id: 7, question: 'FE 질문 7' },
    { id: 8, question: 'FE 질문 8' },
    { id: 9, question: 'FE 질문 9' },
    { id: 10, question: 'FE 질문 10' },
  ],
  be: [
    { id: 1, question: 'BE 질문 1' },
    { id: 2, question: 'BE 질문 2' },
    { id: 3, question: 'BE 질문 3' },
    { id: 4, question: 'BE 질문 4' },
    { id: 5, question: 'BE 질문 5' },
    { id: 6, question: 'BE 질문 6' },
    { id: 7, question: 'BE 질문 7' },
    { id: 8, question: 'BE 질문 8' },
    { id: 9, question: 'BE 질문 9' },
    { id: 10, question: 'BE 질문 10' },
  ],
};

export const getSurveyQuestions = (categoryId: string): SurveyQuestion[] => {
  return SURVEY_QUESTIONS[categoryId as CategoryId] || [];
};
