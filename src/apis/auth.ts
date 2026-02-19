import type { RefreshTokenResponse } from '../types/auth';
import type { CommonResponse } from '../types/common';
import axiosInstance from './axios';
import { getUserInfo } from './user';
import { useUserStore, convertJobToShortCode } from '../store/useUserStore';
import axios from './axios';

export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const response = await axiosInstance.post<CommonResponse<RefreshTokenResponse>>('/auth/refresh');

  if (!response.data?.isSuccess) {
    throw new Error('Token refresh failed');
  }

  return response.data.result;
};

export const syncUserProfile = async (): Promise<void> => {
  try {
    const profile = await getUserInfo();
    useUserStore.getState().setUser({
      name: profile.name,
      userId: profile.id,
      nickname: profile.nickname,
      job: convertJobToShortCode(profile.job),
    });
  } catch (error) {
    console.error('프로필 동기화 실패:', error);
  }
};

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.get('/users/my-page', {
      baseURL: import.meta.env.VITE_SERVER_API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    return true;
  } catch {
    return false;
  }
};
