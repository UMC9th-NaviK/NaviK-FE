import type { CommonResponse } from '../types/common';
import axiosInstance from './axios';
import type { ResponseKpiCard } from '../types/card';

export async function getAllCard(): Promise<ResponseKpiCard[]> {
  const { data } = await axiosInstance.get<CommonResponse<ResponseKpiCard[]>>(`/kpi-cards/me`);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get all cards');
  }

  return data.result;
}

export async function getCoreCard(): Promise<ResponseKpiCard[]> {
  const { data } = await axiosInstance.get<CommonResponse<ResponseKpiCard[]>>(`/kpi-cards/top`);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get all core cards');
  }

  return data.result;
}

export async function getOverComeCard(): Promise<ResponseKpiCard[]> {
  const { data } = await axiosInstance.get<CommonResponse<ResponseKpiCard[]>>(`/kpi-cards/bottom`);

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get all overcome cards');
  }

  return data.result;
}
