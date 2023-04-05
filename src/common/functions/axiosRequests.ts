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
            return handleError(err as AxiosError);
        });
}

export async function postRequest<Return, Body>(
    url: string,
    token: string,
    body?: Body
): Promise<Return | ErrorResponse> {
    return instance
        .post<Return>(url, body, {
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

export async function putRequest<Return, Body>(url: string, token: string, body?: Body) {
    return instance
        .put<Return>(url, body, {
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

export async function newPostRequest<Return, Body>(
    url: string,
    body?: Body
): Promise<Return | ErrorResponse> {
    return instance
        .post<Return>(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.data)
        .catch((err) => {
            return handleError(err as AxiosError);
        });
}

export async function newDeleteRequest(url: string): Promise<boolean | ErrorResponse> {
    return instance
        .delete(url, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(() => true)
        .catch((err) => {
            return handleError(err as AxiosError);
        });
}

export async function newGetRequest<Return>(url: string): Promise<Return | ErrorResponse> {
    return instance
        .get<Return>(url, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.data)
        .catch((err) => {
            return handleError(err as AxiosError);
        });
}

function handleError(err: AxiosError): ErrorResponse {
    const errno: ErrorResponse = {
        statusCode: err.status ?? "500",
        errorMessage: err.message ?? "Internal Server Error",
    };

    console.log("Axios", errno);

    return errno;
}
