import axios from "axios";

// appended section of url after base
const appendedUrl = "api/user/v1/";

// creates base axios instance used around application
export const instance = axios.create({
    baseURL: `http://rest.intramu.com/${appendedUrl}`,
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
