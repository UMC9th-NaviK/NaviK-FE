import type { RefreshTokenResponse } from '../types/auth';
import type { CommonResponse } from '../types/common';
import axiosInstance from './axios';

export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const response = await axiosInstance.post<CommonResponse<RefreshTokenResponse>>('/auth/refresh');

  if (!response.data?.isSuccess) {
    throw new Error('Token refresh failed');
  }

  return response.data.result;
};
