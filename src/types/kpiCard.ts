export type KPICardResponse<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
    timestamp: string;
};

export interface KPICardBase {
    kpiCardId: number;
    name: string;
    imageUrl: string;
}

export type KPICardResponseResult = KPICardBase;
export type KPICardTopResponseResult = KPICardBase;
export type KPICardBottomResponseResult = KPICardBase;
export type KPICardAllResponseResult = KPICardBase;

export interface KPICardDetailResponseResult extends KPICardBase {
    content: {
        title: string;
        content: string;
    };
}

export interface KPICardDetailAllResponseResult extends KPICardBase {
    strong: {
        title: string;
        content: string;
    };
    week: {
        title: string;
        content: string;
    };
}

export interface KPIcardScorePercentageResult extends KPICardBase {
    kpiCardId : number,
    score : number,
    topPercent : number,
    bottomPercent : number,
}

export interface KPIcardScoreMonthlyResult extends KPICardBase {
    year : number,
    month : number,
    currentScore : number,
    previousScore : number,
    changeRate : number,
}