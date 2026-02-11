export type GrowthLogCreatingRequest = {
    content : string
}

// 베이스 타입 정의
export type GrowthLogBaseResponse<T> = {
    data: any
    isSuccess : boolean,
    code : string,
    message : string,
    result : T,
    timestamp : string
}

export type GrowthLogPageResult<T> = {
    content : T[],
    pageSize : number,
    hasNext : boolean,
}

// 성장 로그 생성
export type GrowthLogResponseResult = {
    id : number,
    status : string
}

// 성장 로그 생성 재시도
export type GrowthLogRetryResponseResult = {
    growthLogId : number,
    status : string
}

// 성장 로그 조회
export type GrowthLogCheckResponseResult = {
    growthLogId : number,
    type : string,
    title : string,
    content : string,
    totalDelta : number,
    status : string,
    createdAt : string,
    kpiLinks : GrowthLogCheckResponseResultKPILink[]
}

export type GrowthLogCheckResponseResultKPILink = {
    kpiCardId : number,
    kpiCardName : string,
    delta : number
}

// 월별 성장 로그 조회
export type GrowthLogMonthlyResponseResultContent = {
    growthLogId : number,
    title : string,
    content : string,
    totalDelta : number,
    createdAt : string
}

// 성장 로그 타임라인 조회
export type GrowthLogTimelineResponseResult = {
    period : string,
    sumScore : number,
    cumulativeScore : number
}

export type GrowthLogResponse = GrowthLogBaseResponse<GrowthLogResponseResult>;
export type GrowthLogRetryResponse = GrowthLogBaseResponse<GrowthLogRetryResponseResult>;
export type GrowthLogCheckResponse = GrowthLogBaseResponse<GrowthLogCheckResponseResult>;
export type GrowthLogMonthlyResponse = GrowthLogBaseResponse<GrowthLogPageResult<GrowthLogMonthlyResponseResultContent>>;
export type GrowthLogTimelineResponse = GrowthLogBaseResponse<GrowthLogTimelineResponseResult[]>;