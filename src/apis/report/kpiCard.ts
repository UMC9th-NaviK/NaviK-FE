import type { KPICardResponse, KPICardBase, KPICardDetailAllResponseResult, KPICardDetailResponseResult } from "../../types/kpiCard";
import axiosInstance from "../axios"

export const getKPICard = async (jobId : number) : Promise<KPICardResponse<KPICardBase[]>> => {
    const response = await axiosInstance.get(`/kpi-cards`, {
        params : {
            jobId
        }
    })

    return response.data;
}   

export const getKPICardDetail = async (kpiCardId : number, type : string) : Promise<KPICardResponse<KPICardDetailResponseResult>> => {
    const response = await axiosInstance.get(`/kpi-cards/${kpiCardId}`, {
        params : {
            type
        }
    })

    return response.data;
}   

export const getKPICardDetailAll = async (kpiCardId : number) : Promise<KPICardResponse<KPICardDetailAllResponseResult>> => {
    const response = await axiosInstance.get(`/kpi-cards/${kpiCardId}/all`)

    return response.data;
}   

export const getKPICardTop = async () : Promise<KPICardResponse<KPICardBase[]>> => {
    const response = await axiosInstance.get(`/kpi-cards/top`)

    return response.data;
} 

export const getKPICardAll = async () : Promise<KPICardResponse<KPICardBase[]>> => {
    const response = await axiosInstance.get(`/kpi-cards/me`)

    return response.data;
} 

export const getKPICardBottom = async () : Promise<KPICardResponse<KPICardBase[]>> => {
    const response = await axiosInstance.get(`/kpi-cards/bottom`)

    return response.data;
} 