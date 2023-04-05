import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { instance, setToken } from "../axiosInstance";
import { HttpClient } from "./instance";

type AxiosInterceptorProviderProps = { children: React.ReactNode };
// const httpClient = new HttpClient();

// export function Setter({ children }: AxiosInterceptorProviderProps) {
export function Setter() {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        console.log("in effect");

        // const getAccessToken = async () => {
        //     const accessToken = await getAccessTokenSilently();
        //     await setAxiosTokenInterceptor(accessToken);
        //     setIsTokenSet(true);
        // };
        // getAccessToken();

        setToken(getAccessTokenSilently);
    }, [getAccessTokenSilently]);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        // <AxiosInterceptorContext.Provider value={{ isTokenSet }}>
        null
        // </AxiosInterceptorContext.Provider>
    );
}
