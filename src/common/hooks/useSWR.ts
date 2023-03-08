import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../interfaces/ErrorResponse";
import { instance } from "../../utilities/axiosInstance";

/**
 * This function is basically a copy of Next.js and their SWR hook, except this has
 * none of the additional functionality there's has. I just couldn't think
 * of another name. This performs a get request when the component loads
 * @param url - url path to make request to
 * @returns - data: data object which is the type of the generic specified
 * @returns - error: error object if some error occured
 * @returns - isLoading: loading state of request
 */
const useSWR = <T>(url: string) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<ErrorResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const request = async () => {
            const token = await getAccessTokenSilently();
            setIsLoading(true);

            instance
                .get<T>(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setData(res.data))
                .catch((err) => {
                    const axiosError = err as AxiosError;

                    const errno: ErrorResponse = {
                        statusCode: axiosError.status || "500",
                        errorMessage: axiosError.message || "Internal Server Error",
                    };

                    setError(errno);
                });
            setIsLoading(false);
        };
        request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return {
        data,
        error,
        isLoading,
    };
};

export default useSWR;
