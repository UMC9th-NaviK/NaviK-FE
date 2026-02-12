import { useQuery } from "@tanstack/react-query";
import { getStudyRecommendation } from '../../apis/report/studyRecommend';

export const useStudyRecommend = (cursor : number | null, size : number) => {
    return useQuery({
        queryKey: ["studyRecommend", cursor, size],
        queryFn: () => getStudyRecommendation(cursor, size),
        select: (data) => data.content, 
        retry: 1,
        enabled: !!size,
        staleTime: 0,
    });
};