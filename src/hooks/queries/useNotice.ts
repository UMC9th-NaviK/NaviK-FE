import { useQuery } from '@tanstack/react-query';
import { getNotice } from '../../apis/notice';
import type { ResponseNotice } from '../../types/notice';

export const useGetNotices = () => {
  return useQuery<ResponseNotice[]>({
    queryKey: ['notices'],
    queryFn: () => getNotice(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
