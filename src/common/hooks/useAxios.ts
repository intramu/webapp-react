import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ErrorResponse } from "../../interfaces/ErrorResponse";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
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

    async function postRequest<T, Y>(url: string, body: Y): Promise<T | ErrorResponse> {
        const token = await getAccessTokenSilently();
        return instance
            .post(url, body, {
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

    return {
        getRequest,
        postRequest,
    };
};
