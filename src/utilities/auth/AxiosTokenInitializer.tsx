import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setToken } from "../axiosInstance";

/**
 * Simple function that passes the function to get a token from auth0, into the set token method
 */
export function AxiosTokenInitializer() {
    const { getAccessTokenSilently } = useAuth0();

    // on render set the token
    useEffect(() => {
        setToken(getAccessTokenSilently);
    }, [getAccessTokenSilently]);

    return null;
}
