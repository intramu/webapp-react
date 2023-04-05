import { AxiosError } from "axios";
import { ErrorResponse } from "../../interfaces/ErrorResponse";
import { instance } from "../../utilities/axiosInstance";
import wrapPromise from "./wrapPromise";

export function getRequest<Return>(url: string, token: string) {
    // const promise = fetch(url)
    //     .then((res) => res.json())
    //     .then((res) => res)
    //     .catch((err) => {
    //         return err;
    //     });

    // return wrapPromise(promise);
    return wrapPromise(
        instance
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

                return errno;
            })
    );
}
