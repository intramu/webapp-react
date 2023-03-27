/* eslint-disable no-param-reassign */
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useMemo, useState } from "react";

const AxiosInterceptorContext = React.createContext<{ isTokenSet: boolean }>({ isTokenSet: false });

const setAxiosTokenInterceptor = async (accessToken: string): Promise<void> => {
    console.log("resetting");

    axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
        if (accessToken) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            } else {
                config.headers = {
                    Authorization: `Bearer ${accessToken}`,
                };
            }
        }
        return config;
    });
};

export const useAxiosInterceptor = () => {
    const context = React.useContext(AxiosInterceptorContext);
    if (context === undefined) {
        throw new Error("useAxiosInterceptor must be used within an AxiosInterceptorProvider");
    }
    return context;
};

type AxiosInterceptorProviderProps = { children: React.ReactNode };

export function AxiosInterceptorProvider({ children }: AxiosInterceptorProviderProps) {
    const { getAccessTokenSilently } = useAuth0();
    const [isTokenSet, setIsTokenSet] = useState(false);

    useEffect(() => {
        console.log("in effect");

        const getAccessToken = async () => {
            const accessToken = await getAccessTokenSilently();
            await setAxiosTokenInterceptor(accessToken);
            setIsTokenSet(true);
        };
        getAccessToken();
    }, [getAccessTokenSilently]);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <AxiosInterceptorContext.Provider value={{ isTokenSet }}>
            {children}
        </AxiosInterceptorContext.Provider>
    );
}
