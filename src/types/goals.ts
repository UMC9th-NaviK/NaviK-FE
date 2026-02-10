export type GoalsStatus = 'NONE' | 'COMPLETED' | 'IN_PROGRESS' | 'FAILED';

export type GoalsCreatingRequest = {
    title : string,
    content : string,
    endDate : string,
}

export type GoalsResponse = {
    isSuccess : boolean,
    code : string,
    message : string,
    result : GoalsResponseResult,
    timestamp : string,
}

export type GoalsResponseResult = {
    goalId : number,
    title : string,
    content : string,
    endDate : string,
    status : GoalsStatus,
}

export type GoalsListResponse = {
    isSuccess : boolean,
    code : string,
    message : string,
    result : GoalsListResponseResult,
    timestamp : string,
}

export type GoalsListResponseResult = {
    content : GoalsListResponseResultContent[],
    pageSize : number,
    nextCursor : string,
    hasNext : boolean,
}

export type GoalsListResponseResultContent = {
    goalId : number,
    title : string,
    content : string,
    endDate : string,
    status : GoalsStatus,
}