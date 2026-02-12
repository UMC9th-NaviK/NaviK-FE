import axios from 'axios';
import type { CommonResponse } from '../types/common';
import type {
  RequestPortfolio,
  RequestPortfolioInfo,
  ResponsePortfolio,
  ResponsePortfolioStatus,
  ResponseAdditionalInfo,
} from '../types/portfolio';
import axiosInstance from './axios';

export async function postPortfolio(portfolio: RequestPortfolio): Promise<ResponsePortfolio> {
  const accessToken = localStorage.getItem('accessToken');

  const { data } = await axios.post<CommonResponse<ResponsePortfolio>>(
    `${import.meta.env.VITE_OAUTH_API_URL}/portfolios`,
    portfolio,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to post portfolio');
  }
  return data.result;
}

export async function postAddPortfolio(
  portfolioId: number,
  info: RequestPortfolioInfo,
): Promise<ResponseAdditionalInfo> {
  const { data } = await axiosInstance.post<CommonResponse<ResponseAdditionalInfo>>(
    `/portfolios/${portfolioId}/additional-info`,
    {
      ...info,
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to post portfolio info');
  }

  return data.result;
}

export async function getPortfolioStatus(portfolioId: number): Promise<ResponsePortfolioStatus> {
  const { data } = await axiosInstance.get<CommonResponse<ResponsePortfolioStatus>>(
    `/portfolios/${portfolioId}/status`,
  );

  if (!data.isSuccess) {
    throw new Error(data.message || 'Failed to get portfolio status');
  }

  return data.result;
}
