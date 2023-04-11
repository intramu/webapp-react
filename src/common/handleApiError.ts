import { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/ErrorResponse";

export function handleError(err: Error): ErrorResponse {
    if (err instanceof AxiosError) {
        const errno: ErrorResponse = {
            statusCode: err.response?.status || 500,
            errorMessage: err.message ?? "Internal Server Error",
        };
        console.log("Axios", errno);
        return errno;
    }

    const errno: ErrorResponse = {
        statusCode: 500,
        errorMessage: err.message ?? "Internal Server Error",
    };
    return errno;
}
