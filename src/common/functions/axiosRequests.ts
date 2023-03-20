import { AxiosError } from "axios";
import { ErrorResponse } from "../../interfaces/ErrorResponse";
import { instance } from "../../utilities/axiosInstance";

export async function getRequest<Return>(
    url: string,
    token: string
): Promise<Return | ErrorResponse> {
    return instance
        .get<Return>(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data)
        .catch((err) => {
            const error = err as AxiosError;

            const errno: ErrorResponse = {
                statusCode: error.status || "500",
                errorMessage: error.message || "Internal Server Error",
            };

            console.log(err);

            return errno;
        });
}
