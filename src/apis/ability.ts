import axiosInstance from './axios';
import type { ApiResponse } from '../types/user';
import type { AbilityPageResult } from '../types/ability';

export const getAbilityList = async (
  size: number = 10,
  cursor?: string,
): Promise<AbilityPageResult> => {
  try {
    const response = await axiosInstance.get<ApiResponse<AbilityPageResult>>('/abilities', {
      params: {
        size,
        cursor: cursor || undefined, // 값이 없으면 쿼리 파라미터에서 제외
      },
    });

    if (response.data.isSuccess) {
      return response.data.result;
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error('활동 역량 조회 실패:', error);
    throw error;
  }
};
