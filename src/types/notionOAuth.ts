export type NotionOAuthResponse = {
    isSuccess : boolean,
    code : string,
    message : string,
    result : NotionOAuthResponseResult,
    timestamp : string
}

export type NotionOAuthResponseResult = {
    authorizationUrl : string
}