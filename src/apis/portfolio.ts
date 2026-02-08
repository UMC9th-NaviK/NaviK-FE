import type { CommonResponse } from '../types/common';
import type { RequestPortfolio, ResponsePortfolio } from '../types/portfolio';
import axiosInstance from './axios';

export async function postPortfolio(portfolio: RequestPortfolio): Promise<ResponsePortfolio> {
  const { data } = await axiosInstance.post<CommonResponse<ResponsePortfolio>>(`portfolios`, {
    ...portfolio,
  });

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to post portfolio');
  }
  return data.result;
}
