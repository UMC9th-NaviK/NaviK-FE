import { useQuery } from "@tanstack/react-query";
import { getUserLevel } from "../../apis/level";

export const useLevel = () => {
    return useQuery({
        queryKey: ["userLevel"],
        queryFn: getUserLevel,
        select: (response) => response.result, 
        placeholderData: (previousData) => previousData, 
        retry: 1,
    });
};