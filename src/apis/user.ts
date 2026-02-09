import type { CommonResponse } from '../types/common';
import type { ResponseUserProfile } from '../types/user';
import axiosInstance from './axios';

export async function getUserProfile(): Promise<ResponseUserProfile> {
  const { data } = await axiosInstance.get<CommonResponse<ResponseUserProfile>>('/users/profile');

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get user profile');
  }

  return data.result;
}
