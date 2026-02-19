import { useQuery } from "@tanstack/react-query";
import { getStudyRecommendation, getStudyRecommendationKPIId } from '../../apis/report/studyRecommend';

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

export const useStudyRecommendationKPI = (kpiId: number, cursor: number | null, size: number) => {
    return useQuery({
        queryKey: ["studyRecommendations", kpiId, cursor, size],
        queryFn: () => getStudyRecommendationKPIId(kpiId, cursor, size),
        enabled: !!kpiId, 
        staleTime: 1000 * 60 * 5, 
    });
};