import type {
  ApiResponse,
  ResponseUserInfo,
  UserProfile,
  UpdateProfileRequest,
} from '../types/user';
import { cleanImageUrl } from '../utils/imgFormat';

import axiosInstance from './axios';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axiosInstance.get<ApiResponse<UserProfile>>('/users/profile');

    if (response.data.isSuccess) {
      const result = response.data.result;

      if (result.profileImageUrl) {
        result.profileImageUrl = cleanImageUrl(result.profileImageUrl);
      }
      return result;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('프로필 로딩 중 에러:', error);
    throw error;
  }
};

export const getUserMyPage = async (): Promise<ResponseUserInfo> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ResponseUserInfo>>('/users/my-page');
    if (response.data.isSuccess) {
      const result = response.data.result;

      if (result.profileImageUrl) {
        result.profileImageUrl = cleanImageUrl(result.profileImageUrl);
      }
      return result;
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
export async function getUserInfo(): Promise<ResponseUserInfo> {
  const { data } = await axiosInstance.get<ApiResponse<ResponseUserInfo>>('/users/my-page');

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get user info');
  }
  return data.result;
}

//포르필 이미지 수정
export const putUserProfileImage = async (imageUrl: string) => {
  const response = await axiosInstance.put('/users/profile-image', imageUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
