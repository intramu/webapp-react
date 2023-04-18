import { useAuth0 } from "@auth0/auth0-react";
import { ErrorResponse } from "../../interfaces/ErrorResponse";
import { instance } from "../../utilities/axiosInstance";
import { handleError } from "../handleApiError";

export default () => {
    const { getAccessTokenSilently } = useAuth0();

    async function getRequest<Return>(url: string): Promise<Return | ErrorResponse> {
        const token = await getAccessTokenSilently();
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

    async function postRequest<Return, Body>(
        url: string,
        body?: Body
    ): Promise<Return | ErrorResponse> {
        const token = await getAccessTokenSilently();
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

    async function patchRequest<Return, Body>(
        url: string,
        body?: Body
    ): Promise<Return | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .patch<Return>(url, body, {
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

    async function putRequest<Return, Body>(
        url: string,
        body?: Body
    ): Promise<Return | ErrorResponse> {
        const token = await getAccessTokenSilently();
        console.log(body);

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

    async function deleteRequest(url: string): Promise<boolean | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => true)
            .catch((err) => {
                return handleError(err);
            });
    }

    return {
        getRequest,
        postRequest,
        patchRequest,
        putRequest,
        deleteRequest,
    };
};
