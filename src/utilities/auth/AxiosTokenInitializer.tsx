import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setToken } from "../axiosInstance";

export function AxiosTokenInitializer() {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        setToken(getAccessTokenSilently);
    }, [getAccessTokenSilently]);

    return null;
}
