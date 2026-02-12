import axiosInstance from './axios';
import type {
  CreateStudyReq,
  GetKpiCardsParams,
  KpiCardListResult,
  GetMyStudiesParams,
  MyStudyListResult,
  GetStudyApplicantResponse,
  StudyApplicantDecisionReq,
  StudyApplicantDecisionResult,
  GetStudyRecommendationParams,
  StudyRecommendationListResult,
} from '../types/study';
import type { ApiResponse } from '../types/board';
import type { StudyApplyReponse } from '../types/study';

//스터디 생성
export const createStudy = (body: CreateStudyReq) => {
  return axiosInstance.post<ApiResponse<number>>('/studies', body);
};

//직무별 KPI 카드목록 조회
export const getStudyKpiCards = (params: GetKpiCardsParams) => {
  return axiosInstance.get<ApiResponse<KpiCardListResult>>('/studies/kpi-cards', { params });
};

//나의 스터디 목록 조회
export const getMyStudies = (params: GetMyStudiesParams) => {
  return axiosInstance.get<ApiResponse<MyStudyListResult>>('/studies/my', { params });
};

//스터디 신청현황 목록 조회
export const getStudyApplicants = (
  studyId: number,
  params?: { cursor?: number; size?: number },
) => {
  return axiosInstance.get<GetStudyApplicantResponse>(`/studies/${studyId}/applicants`, { params });
};

//스터디 신청 수락/거절 처리
export const decideStudyApplicant = (studyUserId: number, body: StudyApplicantDecisionReq) => {
  return axiosInstance.patch<ApiResponse<StudyApplicantDecisionResult>>(
    `/studies/applicants/${studyUserId}`,
    body,
  );
};

//맞춤형 스터디 추천목록 조회
export const getStudyRecommendations = (params?: GetStudyRecommendationParams) => {
  return axiosInstance.get<ApiResponse<StudyRecommendationListResult>>('/studies/recommendation', {
    params,
  });
};

//스터디 신청하기 버튼 클릭
export const applyStudy = (studyId: number) => {
  return axiosInstance.post<StudyApplyReponse>(`/studies/${studyId}/apply`);
};
