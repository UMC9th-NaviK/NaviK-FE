import axiosInstance from "../axios";
import type { GoalsResponse, GoalsResponseResult, GoalsCreatingRequest } from "../../types/goals";

export const postGoals = async (data : GoalsCreatingRequest) : Promise<GoalsResponse> => {
    const response = await axiosInstance.post(`/goals`, data)

    return response.data;
}

export const patchGoalsStatus = async (goalId : number, status : GoalsResponseResult['status']) => {
    const response = await axiosInstance.patch(`/goals/${goalId}/status`, null, {
        params : {
            status: status
        }
    })

    return response.data;
}

export const getGoalsList = async (cursor : number, size : number, sortBy : string) => {
    const response = await axiosInstance.get(`/goals/list`, {
        params : {
            cursor : cursor, 
            size : size, 
            sortBy : sortBy
        }
    })

    return response.data;
}

export const getGoalsInProgress = async () => {
    const response = await axiosInstance.get(`/goals/in-progress`, {})

    return response.data;
}

export const deleteGoals = async (goalId : number) => {
    const response = await axiosInstance.delete(`/goals/${goalId}`, {})

    return response.data;
}

export const getGoals = async (goalId : number) => {
    const response = await axiosInstance.get(`/goals/${goalId}`, {})

    return response.data;
}

export const patchGoals = async (goalId : number, data : GoalsCreatingRequest) : Promise<GoalsResponse> => {
    const response = await axiosInstance.patch(`/goals/${goalId}`, data)

    return response.data;
}