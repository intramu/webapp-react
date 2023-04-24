export enum StatusCode {
    NotFound = "404",
    InternalError = "500",
}

export interface ErrorResponse {
    errorMessage: string;
    statusCode: number;
}

// type guard to check if api response is an error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorResponse = (obj: any): obj is ErrorResponse => {
    return obj.errorMessage !== undefined;
};
