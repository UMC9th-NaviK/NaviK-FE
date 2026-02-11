import { useMutation, useQuery } from '@tanstack/react-query';
import { postPortfolio, postAddPortfolio, getPortfolioStatus } from '../../apis/portfolio';
import type { RequestPortfolio, RequestPortfolioInfo } from '../../types/portfolio';

/**
 * 초기 포트폴리오 등록
 */
export const usePostPortfolio = () => {
  return useMutation({
    mutationFn: (portfolio: RequestPortfolio) => postPortfolio(portfolio),
  });
};

/**
 * 추가 정보 제출
 */
export const usePostAdditionalInfo = () => {
  return useMutation({
    mutationFn: ({ portfolioId, info }: { portfolioId: number; info: RequestPortfolioInfo }) =>
      postAddPortfolio(portfolioId, info),
  });
};

/**
 * 포트폴리오 상태 조회 query (폴링용)
 * enabled: false로 설정하고 수동으로 refetch 호출
 */
export const useGetPortfolioStatus = (portfolioId: number | null, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['portfolioStatus', portfolioId],
    queryFn: () => {
      if (!portfolioId) throw new Error('portfolioId is required');
      return getPortfolioStatus(portfolioId);
    },
    enabled: enabled && portfolioId !== null,
    refetchInterval: false, // 자동 refetch 비활성화
    retry: 3,
  });
};
