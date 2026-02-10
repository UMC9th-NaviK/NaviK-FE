import type { Recruitment } from '../types/recruits';
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
