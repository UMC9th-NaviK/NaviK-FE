export type UserLevelResponse = {
    isSuccess : boolean,
    code : string,
    message : string,
    result : UserLevelResponseResult,
    timestamp : string
}

export type UserLevelResponseResult = {
    level : number,
    description : string,
    percentage : number
}