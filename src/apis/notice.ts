import type { CommonResponse } from '../types/common';
import type { ResponseNotice } from '../types/notice';
import axiosInstance from './axios';

export async function getNotice() {
  const { data } = await axiosInstance.get<CommonResponse<ResponseNotice[]>>(`/notifications`);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get notices');
  }

  return data.result;
}

export async function patchNotice({ notificationId }: { notificationId: number }) {
  const { data } = await axiosInstance.patch<CommonResponse<string>>(
    `/notifications/${notificationId}`,
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to mark notices as read');
  }

  return data.result;
}
