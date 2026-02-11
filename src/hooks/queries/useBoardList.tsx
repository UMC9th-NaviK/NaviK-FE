import { useQuery } from '@tanstack/react-query';
import { getHotBoardList } from '../../apis/board';
import type { BoardListItem } from '../../types/board';

export const useHotBoardList = () => {
  return useQuery<BoardListItem[]>({
    queryKey: ['hotBoards'],
    queryFn: () => getHotBoardList().then((res) => res.data.result.content),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
