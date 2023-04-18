import { AxiosError } from "axios";
import { ErrorResponse } from "../../interfaces/ErrorResponse";
import { instance } from "../../utilities/axiosInstance";
import { handleError } from "../handleApiError";

const commonAxiosHeaders = {
    "Content-Type": "application/json",
};

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
            return handleError(err);
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
            return handleError(err);
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
            return handleError(err);
        });
}

export async function newPostRequest<Return, Body>(
    url: string,
    body?: Body
): Promise<Return | ErrorResponse> {
    return instance
        .post<Return>(url, body, {
            headers: commonAxiosHeaders,
        })
        .then((res) => res.data)
        .catch((err) => handleError(err));
}

export async function newDeleteRequest(url: string): Promise<boolean | ErrorResponse> {
    return instance
        .delete(url, {
            headers: commonAxiosHeaders,
        })
        .then(() => true)
        .catch((err) => handleError(err));
}

export async function newGetRequest<Return>(url: string): Promise<Return | ErrorResponse> {
    return instance
        .get<Return>(url, {
            headers: commonAxiosHeaders,
        })
        .then((res) => res.data)
        .catch((err) => handleError(err));
}

export async function newPatchRequest<Return, Body>(
    url: string,
    body?: Body
): Promise<Return | ErrorResponse> {
    return instance
        .patch<Return>(url, body, {
            headers: commonAxiosHeaders,
        })
        .then((res) => res.data)
        .catch((err) => handleError(err));
}

export async function newPutRequest<Return, Body>(url: string, body?: Body) {
    return instance
        .put<Return>(url, body, {
            headers: commonAxiosHeaders,
        })
        .then((res) => res.data)
        .catch((err) => handleError(err));
}
