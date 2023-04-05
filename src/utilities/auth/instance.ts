import axios, { AxiosInstance } from "axios";

const appendedUrl = "user/v1/";

// export const instance = axios.create({
//     baseURL: `http://localhost:8080/${appendedUrl}`,
// });

export class HttpClient {
    instance: AxiosInstance;

    tokenGenerator: any = "";

    constructor() {
        // HttpClient.instance = axios.create({ baseURL: process.env.API_BASE_URL });
        this.instance = axios.create({ baseURL: `http://localhost:8080/${appendedUrl}` });

        this.instance.interceptors.request.use(
            async (config) => {
                console.log(this.tokenGenerator);

                const token = await this.getToken();

                console.log(token);
                return {
                    ...config,
                    headers: { ...config.headers, Authorization: `Bearer ${token}` },
                };
            },
            (error) => {
                Promise.reject(error);
            }
        );
    }

    setTokenGenerator(tokenGenerator: any) {
        this.tokenGenerator = tokenGenerator;
        console.log("token", tokenGenerator);
        return this;
    }

    getToken() {
        return this.tokenGenerator();
    }
}
