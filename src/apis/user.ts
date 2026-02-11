import type { ApiResponse, UpdateProfileRequest, UserProfile } from '../types/user';
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

export const getUserMyPage = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<ApiResponse<UserProfile>>('/users/my-page');
    if (response.data.isSuccess) {
      return response.data.result;
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error('마이페이지 조회 실패:', error);
    throw error;
  }
};

// 프로필 수정 API (PATCH)
export const patchUserProfile = async (body: UpdateProfileRequest): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.patch<ApiResponse<null>>('/users/my-page', body);
    if (response.data.isSuccess) {
      return response.data;
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    throw error;
  }
};
