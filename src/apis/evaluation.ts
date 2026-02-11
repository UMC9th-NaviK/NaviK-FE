import axiosInstance from './axios';
import type {
  GetMyEvaluationSummaryResponse,
  GetEvaluationStudiesParams,
  GetEvaluationStudiesResponse,
  EvaluationStudyDetail,
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
