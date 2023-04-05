import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { AxiosInterceptorProvider } from "./AxiosInterceptorProvider";
import { CommonAuthProvider } from "./CommonAuthProvider";
import { Setter } from "./Setter";

type AuthProviderProps = { children: React.ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
    // export function AuthProvider({ children }) {
    return (
        <Auth0Provider
            domain="dev-5p-an07k.us.auth0.com"
            clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
            redirectUri="http://localhost:3000/dashboard"
            audience="https://server-authorization/">
            {/* <AxiosInterceptorProvider>
                <CommonAuthProvider>{children}</CommonAuthProvider>
            </AxiosInterceptorProvider> */}
            {/* <Setter>{children}</Setter> */}
        </Auth0Provider>
    );
}