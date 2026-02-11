import type { UserLevelResponse } from "../types/level"
import axiosInstance from "./axios"

export const getUserLevel = async () : Promise<UserLevelResponse> => {
    const response = await axiosInstance.get(`/users/me/level`, {})

    return response.data
}