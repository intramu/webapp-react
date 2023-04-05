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

// export class HttpClient {
//     constructor() {
//         // HttpClient.instance = axios.create({ baseURL: process.env.API_BASE_URL });
//         HttpClient.instance = axios.create({ baseURL: `http://localhost:8080/${appendedUrl}` });

//         HttpClient.instance.interceptors.request.use(
//             async (config) => {
//                 const token = await this.getToken();

//                 return {
//                     ...config,
//                     headers: { ...config.headers, Authorization: `Bearer ${token}` },
//                 };
//             },
//             (error) => {
//                 Promise.reject(error);
//             }
//         );

//         return this;
//     }
// }
