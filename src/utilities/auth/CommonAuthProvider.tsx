import React from "react";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useAxiosInterceptor } from "./AxiosInterceptorProvider";

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<{
    isTokenSet: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    getAccessTokenSilently?: (opts?: GetTokenSilentlyOptions) => Promise<string>;
}>({
    isTokenSet: false,
    isAuthenticated: false,
    isLoading: true,
});

export function CommonAuthProvider({ children }: AuthProviderProps) {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { isTokenSet } = useAxiosInterceptor();
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const value = { isTokenSet, isLoading, isAuthenticated, getAccessTokenSilently };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a CommonAuthProvider");
    }
    return context;
};
