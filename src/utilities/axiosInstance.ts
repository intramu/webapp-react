import axios, { AxiosRequestConfig } from "axios";

const appendedUrl = "user/v1/";

export const instance = axios.create({
    baseURL: `http://localhost:8080/${appendedUrl}`,
});

export const setToken = (tokenGenerator: any) => {
    instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
        const token = await tokenGenerator();
        return {
            ...config,
            headers: { ...config.headers, Authorization: `Bearer ${token}` },
        };
    });
};
