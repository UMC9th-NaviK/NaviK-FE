import type { ApiResponse } from './board';

export type CursorPage<T> = {
  content: T[];
  pageSize: number;
  nextCursor: string | null;
  hasNext: boolean;
};

export type EvaluationStudy = {
  studyId: number;
  studyName: string;
};

export type GetEvaluationStudiesParams = {
  cursor?: number;
  size?: number;
};

export type GetEvaluationStudiesResult = CursorPage<EvaluationStudy>;
export type GetEvaluationStudiesResponse = ApiResponse<GetEvaluationStudiesResult>;

export type MyEvaluationSummary = {
  averageScore: number;
  topStrengths: string[];
  topImprovement: string[];
};

export type GetMyEvaluationSummaryResponse = ApiResponse<MyEvaluationSummary>;

export type EvaluationStudyDetail = {
  studyName: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  participationMethod: string;
  weekTime: number;
  status: string;
  strengths: string[];
  improvements: string[];
  adviceList: string[];
  averageScore: number;
};
