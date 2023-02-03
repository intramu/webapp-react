export interface ErrorResponse {
    errorMessage: string;
    statusCode: string;
}

export const isErrorResponse = (obj: any): obj is ErrorResponse => {
    return obj.errorMessage !== undefined;
};
