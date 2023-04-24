// import { AxiosPromise } from "axios";

function wrapPromise<Return>(promise: Promise<Return>) {
    let status = "pending";
    let response: Return;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );
    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                return response;
            default:
                return response;
        }
    };

    return { read };
}

export default wrapPromise;
