import axios, { AxiosError } from "axios";
import { instance } from "../utilities/axiosInstance";

const wrapPromise = (promise: any) => {
    let status = "pending";
    let result: any;
    const suspend = promise().then(
        (res: any) => {
            status = "success";
            result = res;
        },
        (err: AxiosError) => {
            status = "error";
            result = err;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspend;
            } else if (status === "error") {
                throw result;
            } else {
                return result;
            }
        },
    };
};

const dataFetchTest = () => {
    const userPromise = instance
        .get("/network")
        .then((res) => res.data)
        .catch((err) => console.log(err));

    return {
        user: wrapPromise(userPromise),
    };
};
