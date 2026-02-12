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

// 평가 대상 멤버 타입
export type StudyEvaluationMember = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

// 평가 대상 목록 조회 결과 타입
export type StudyEvaluationTargetsResult = {
  studyName: string;
  recruitmentStatus: string;
  members: StudyEvaluationMember[];
};

// 최종 응답 타입
export type GetStudyEvaluationTargetsResponse = ApiResponse<StudyEvaluationTargetsResult>;

// 평가 제출 요청 데이터 타입
export type CreateEvaluationReq = {
  targetUserId: number; // 평가 대상자 ID
  score: number; // 별점 (1~5)
  strengthTagIds: number[]; // 강점 태그 ID 리스트 (최대 5개)
  weaknessTagIds: number[]; // 보완 태그 ID 리스트 (최대 5개)
  advice: string; // 조언 (선택)
};

// 평가 제출 응답 타입 (성공 시 보통 null이나 메시지)
export type CreateEvaluationResponse = ApiResponse<null>;
