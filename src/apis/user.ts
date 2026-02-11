import type { ApiResponse, ResponseUserInfo, UserProfile } from '../types/user';
import axiosInstance from './axios';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<ApiResponse<UserProfile>>('/users/profile');

    if (response.data.isSuccess) {
      return response.data.result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('프로필 로딩 중 에러:', error);
    throw error;
  }
};

export async function getUserInfo(): Promise<ResponseUserInfo> {
  const { data } = await axiosInstance.get<ApiResponse<ResponseUserInfo>>('/users/my-page');

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get user info');
  }
  return data.result;
}
