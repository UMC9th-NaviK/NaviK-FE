import type { KPICardResponse, KPIcardScoreMonthlyResult, KPIcardScorePercentageResult } from "../../types/kpiCard";
import axiosInstance from "../axios"

export const getKPIScorePercentile = async (kpiCardId : number) : Promise<KPICardResponse<KPIcardScorePercentageResult>>=> {
    const response = await axiosInstance.get(`/kpi-scores/${kpiCardId}/percentile`, {})

    return response.data;
}

export const getKPIScoreMonthlyChangeRate = async () : Promise<KPICardResponse<KPIcardScoreMonthlyResult>> => {
    const response = await axiosInstance.get(`/kpi-scores/monthly-change-rate`, {})

    return response.data;
}