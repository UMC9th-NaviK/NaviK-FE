import axiosInstance from "../axios";

interface StudyRecommendation {
    studyId: number;
    title: string;
    description: string;
    kpiName: string;
    kpiId: number;
    startDate: string;
    endDate: string;
    capacity: number;
    participantCount: number;
    participationMethod: "ONLINE" | "OFFLINE" | "HYBRID";
}

interface StudyRecommendResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        content: StudyRecommendation[];
        pageSize: number;
        nextCursor: number | null;
        hasNext: boolean;
    };
    timestamp: string;
}

interface StudyRecommendationListResult {
    content: StudyRecommendation[];
    pageSize: number;
    nextCursor: number | null;
    hasNext: boolean;
}

export const getStudyRecommendation = async (cursor : number | null, size : number) : Promise<StudyRecommendationListResult> => {
    const response = await axiosInstance.get(`/studies/recommendation`, {
        params : {
            cursor, size,
        }
    })

    return response.data.result;
}