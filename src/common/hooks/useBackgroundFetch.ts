import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
});

export const useBackgroundFetch = <T>(url: string) => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true);
            axios
                .get<T>(url)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err: AxiosError) => {
                    setError(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        fetchData();
    }, [url]);

    return { error, data, isLoading };
};
