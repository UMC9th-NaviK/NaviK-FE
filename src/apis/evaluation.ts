import axiosInstance from './axios';
import type {
  GetMyEvaluationSummaryResponse,
  GetEvaluationStudiesParams,
  GetEvaluationStudiesResponse,
  EvaluationStudyDetail,
  StudyEvaluationTargetsResult,
  CreateEvaluationReq,
  CreateEvaluationResponse,
} from '../types/evaluation';
import type { ApiResponse } from '../types/board';

//나의 누적 평가 요약 조회
export const getMyEvaluationSummary = () => {
  return axiosInstance.get<GetMyEvaluationSummaryResponse>('/evaluations/my');
};

//스터디 평가목록 조회
export const getEvaluationStudies = (params?: GetEvaluationStudiesParams) => {
  return axiosInstance.get<GetEvaluationStudiesResponse>('/evaluations/studies', { params });
};

//스터디 평가 상세 조회
export const getEvaluationStudyDetail = (studyId: number) => {
  return axiosInstance.get<ApiResponse<EvaluationStudyDetail>>(`/evaluations/studies/${studyId}`);
};

// 스터디 평가 대상자 목록 조회
export const getStudyEvaluationTargets = (studyId: number) => {
  return axiosInstance
    .get<ApiResponse<StudyEvaluationTargetsResult>>(`/evaluations/study/${studyId}/targets`)
    .then((res) => res.data); // 👈 이 줄을 추가해서 데이터만 전달!
};

// 스터디 멤버 평가 제출 (POST)
export const createStudyEvaluation = (studyId: number, body: CreateEvaluationReq) => {
  return axiosInstance.post<CreateEvaluationResponse>(`/evaluations/study/${studyId}`, body);
};
