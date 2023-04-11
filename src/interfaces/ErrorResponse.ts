export enum StatusCode {
    NotFound = "404",
    InternalError = "500",
}

export interface ErrorResponse {
    errorMessage: string;
    statusCode: number;
}

export const isErrorResponse = (obj: any): obj is ErrorResponse => {
    return obj.errorMessage !== undefined;
};
