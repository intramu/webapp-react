import axios from "axios";

const { VITE_AXIOS_APPENDED_URL, VITE_AXIOS_BASE_URL } = import.meta.env;

// creates base axios instance used around application
export const instance = axios.create({
    baseURL: `${VITE_AXIOS_BASE_URL}/${VITE_AXIOS_APPENDED_URL}`,
});

/**
 * Places token in Bearer position in axios interceptor.
 * Will be sent with every request
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToken = (tokenGenerator: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.interceptors.request.use(async (config: any) => {
        const token = await tokenGenerator();
        return {
            ...config,
            headers: { ...config.headers, Authorization: `Bearer ${token}` },
        };
    });
};
