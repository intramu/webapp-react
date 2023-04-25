/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DOMAIN: string;
    readonly VITE_CLIENT_ID: string;
    readonly VITE_AUDIENCE: string;
    readonly VITE_REDIRECT_URI: string;
    readonly VITE_SCOPE: string;
    readonly VITE_AXIOS_BASE_URL: string;
    readonly VITE_AXIOS_APPENDED_URL: string;
    readonly VITE_ROLE_CLAIMS_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
