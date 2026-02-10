import type { RequestBasicInfo, ResponseBasicInfo } from '../types/user';
import type { CommonResponse } from '../types/common';
import axiosInstance from './axios';

export async function postBasicInfo(user: RequestBasicInfo): Promise<ResponseBasicInfo> {
  const { data } = await axiosInstance.post<CommonResponse<ResponseBasicInfo>>(
    `/users/me/basic-info`,
    {
      ...user,
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to post basic info');
  }

  return data.result;
}
