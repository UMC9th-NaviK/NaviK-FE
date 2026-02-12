import { useQuery } from "@tanstack/react-query";
import { getKPIScoreMonthlyChangeRate, getKPIScorePercentile } from "../../apis/report/kpiCardScore";

export const useKPIScore = (kpiCardId: number) => {
    return useQuery({
        queryKey: ["kpiScore", kpiCardId],
        queryFn: () => getKPIScorePercentile(kpiCardId),
        enabled: !!kpiCardId,
        select: (response) => response.result,
    });
};

export const useKPIScoreMonthly = () => {
    return useQuery({
        queryKey: ["kpiScore", "monthly"],
        queryFn: () => getKPIScoreMonthlyChangeRate(),
        select: (response) => response.result,
    });
};