import type { ApiResponse } from './board';

export type StudyApplyResult = string;

export type CursorPage<T> = {
  content: T[];
  pageSize: number;
  nextCursor: string;
  hasNext: boolean;
};

export type StudyRecommendation = {
  studyId: number;
  title: string;
  description: string;
  kpiName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  participantCount: number;
  participationMethod: string;
};

export type GetStudyRecommendationParams = {
  cursor?: number;
  size?: number;
};

export type StudyRecommendationListResult = CursorPage<StudyRecommendation>;

export type StudyApplicantDecisionReq = {
  accept: boolean;
};

export type StudyApplicantDecisionResult = string;

export type StudyApplicant = {
  studyUserId: number;
  userId: number;
  name: string;
  jobName: string;
  level: number;
  score: number;
  profileImageUrl: string;
};

export type StudyApplicantListResult = {
  content: StudyApplicant[];
  pageSize: number;
  nextCursor: string;
  hasNext: boolean;
};

export type MyStudyRole = 'STUDY_LEADER' | 'STUDY_MEMBER';

export type GetMyStudiesParams = {
  role: MyStudyRole;
  cursor?: number;
  size?: number;
};

export type MyStudyItem = {
  studyUserId: number;
  studyId: number;
  title: string;
  kpiName: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  currentParticipants: number;
  participationMethod: string;
  openChatUrl: string;
  recruitment_status: string;
  role: string;
  canEvaluate: boolean;
};

export type MyStudyListResult = {
  content: MyStudyItem[];
  pageSize: number;
  nextCursor: string;
  hasNext: boolean;
};

export type SynergyType = 'SAME_JOB' | 'DIVERSE_JOB';

export type CreateStudyReq = {
  title: string;
  capacity: number;
  description: string;
  jobId: number;
  kpiId: number;
  participationMethod: string;
  synergyType: SynergyType;
  startDate: string;
  endDate: string;
  openChatUrl: string;
  weekTime: number;
};

export type KpiCard = {
  kpiId: number;
  name: string;
};

export type KpiCardListResult = {
  content: KpiCard[];
  pageSize: number;
  nextCursor: string;
  hasNext: boolean;
};

export interface GetKpiCardsParams {
  jobName: string;
  cursor?: number;
  size?: number;
}

export type GetKpiCardsResponse = ApiResponse<KpiCardListResult>;

export type CreateStudyResponse = ApiResponse<number>;

export type GetMyStudiesResponse = ApiResponse<MyStudyListResult>;

export type GetStudyApplicantResponse = ApiResponse<StudyApplicantListResult>;

export type StudyApplicantDecisionResponse = ApiResponse<StudyApplicantDecisionResult>;

export type GetStudyRecommendationResponse = ApiResponse<StudyRecommendationListResult>;

export type StudyApplyReponse = ApiResponse<StudyApplyResult>;
