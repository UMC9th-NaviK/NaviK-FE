import type { GrowthLogCheckResponse, GrowthLogCreatingRequest, GrowthLogMonthlyResponse, GrowthLogResponse, GrowthLogRetryResponse, GrowthLogTimelineResponse } from '../../types/growth';
import axiosInstance from '../axios';

export const postGrowthLog = async (data : GrowthLogCreatingRequest) : Promise<GrowthLogResponse> => {
    const response = await axiosInstance.post(`/growth-logs`, data)

    return response.data;
}

export const postGrowthLogRetry = async (growthLogId : number) : Promise<GrowthLogRetryResponse> => {
    const response = await axiosInstance.post(`/growth-logs/${growthLogId}/retry`)

    return response.data;
}

export const getGrowthLog = async (growthLogId : number) : Promise<GrowthLogCheckResponse> => {
    const response = await axiosInstance.get(`/growth-logs/${growthLogId}`, {
        params : {
            growthLogId
        }
    })

    return response.data;
}

export const getGrowthLogMonthly = async (yearMonth : string, type : string, page : number, size : number) : Promise<GrowthLogMonthlyResponse> => {
    const response = await axiosInstance.get(`/growth-logs/monthly`, {
        params : {
            yearMonth, type, page, size
        }
    })

    return response.data;
}

export const getGrowthLogAggregateScore = async (unit : string, type : string) :Promise<GrowthLogTimelineResponse> => {
    const response = await axiosInstance.get(`/growth-logs/aggregate/scores`, {
        params : {
            unit, type
        }
    })

    return response.data;
}   