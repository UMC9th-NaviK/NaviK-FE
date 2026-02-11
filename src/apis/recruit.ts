import type { CursorPageResponse, Recruitment, RecruitPostFilterBody } from '../types/recruits';
import type { ApiResponse } from '../types/user';
import axiosInstance from './axios';

export const getRecruitments = async (): Promise<Recruitment[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Recruitment[]>>('/recruitments');
    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('공고 리스트 로딩 실패:', error);
    throw error;
  }
};

export const searchPositions = async (
  body: RecruitPostFilterBody,
  cursor?: string,
  size: number = 10,
): Promise<CursorPageResponse<Recruitment>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<CursorPageResponse<Recruitment>>>(
      '/recruitments/positions',
      body, // Request Body
      {
        params: { cursor, size }, // Query Parameters (?cursor=...&size=10)
      },
    );

    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('포지션 검색 실패:', error);
    throw error;
  }
};

export const getPositionsCount = async (body: RecruitPostFilterBody): Promise<number> => {
  try {
    const response = await axiosInstance.post<ApiResponse<number>>(
      '/recruitments/positions/count',
      body,
    );
    if (response.data.isSuccess) {
      return response.data.result;
    }
    return 0;
  } catch (error) {
    console.error('공고 갯수 로드 실패:', error);
    return 0;
  }
};
