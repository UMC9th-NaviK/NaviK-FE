// apis/auth.ts
import type { RefreshTokenResponse } from '../types/auth';
import type { CommonResponse } from '../types/common';
import axiosInstance from './axios';
import { getUserProfile } from './user';
import { useUserStore, convertJobToShortCode } from '../store/useUserStore';

export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const response = await axiosInstance.post<CommonResponse<RefreshTokenResponse>>('/auth/refresh');

  if (!response.data?.isSuccess) {
    throw new Error('Token refresh failed');
  }

  return response.data.result;
};

export const syncUserProfile = async (): Promise<void> => {
  try {
    const profile = await getUserProfile();
    useUserStore.getState().setUser({
      userId: profile.id,
      nickname: profile.nickname,
      job: convertJobToShortCode(profile.job),
    });
  } catch (error) {
    console.error('프로필 동기화 실패:', error);
  }
};
