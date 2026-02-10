import { useQuery } from '@tanstack/react-query';
import { getAllCard, getCoreCard, getOverComeCard } from '../../apis/card';
import type { ResponseKpiCard } from '../../types/card';

export const useGetAllKpiCards = () => {
  return useQuery<ResponseKpiCard[]>({
    queryKey: ['kpiCards', 'all'],
    queryFn: () => getAllCard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetCoreKpiCards = () => {
  return useQuery<ResponseKpiCard[]>({
    queryKey: ['kpiCards', 'core'],
    queryFn: () => getCoreCard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetOvercomeKpiCards = () => {
  return useQuery<ResponseKpiCard[]>({
    queryKey: ['kpiCards', 'overcome'],
    queryFn: () => getOverComeCard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
