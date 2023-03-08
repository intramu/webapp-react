import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError } from "axios";
import { boolean } from "yup";
import { ErrorResponse } from "../../interfaces/ErrorResponse";

const appendedUrl = "user/v1/";
const instance = axios.create({
    baseURL: `http://localhost:8080/${appendedUrl}`,
});

export default () => {
    const { getAccessTokenSilently } = useAuth0();

    async function getRequest<T>(url: string): Promise<T | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .get<T>(url, {
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

    async function postRequest<RETURN, BODY>(
        url: string,
        body?: BODY
    ): Promise<RETURN | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .post<RETURN>(url, body, {
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

                console.log("Axios", err);

                return errno;
            });
    }

    async function patchRequest<RETURN, BODY>(
        url: string,
        body?: BODY
    ): Promise<RETURN | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .patch<RETURN>(url, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .catch((err) => {
                return handleError(err as AxiosError);
            });
    }

    async function deleteRequest(url: string): Promise<boolean | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                return true;
            })
            .catch((err) => {
                return handleError(err as AxiosError);
            });
    }

    return {
        getRequest,
        postRequest,
        patchRequest,
        deleteRequest,
    };

    function handleError(err: AxiosError): ErrorResponse {
        const errno: ErrorResponse = {
            statusCode: err.status ?? "500",
            errorMessage: err.message ?? "Internal Server Error",
        };

        console.log("Axios", errno);

        return errno;
    }
};
