import axios from "axios";

const appendedUrl = "user/v1/";
export const instance = axios.create({
    baseURL: `http://localhost:8080/${appendedUrl}`,
});
