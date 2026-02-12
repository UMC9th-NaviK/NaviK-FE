export type UserLevelResponse = {
    isSuccess : boolean,
    code : string,
    message : string,
    result : UserLevelResponseResult,
    timestamp : string
}

export type UserLevelResponseResult = {
    levelValue : number,
    description : string,
    percentage : number
}