import type { ApiResponse, UserProfile } from '../types/user';
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
