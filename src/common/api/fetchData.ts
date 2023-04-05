import axios from "axios";
import wrapPromise from "./wrapPromise";

function fetchData(url: string) {
    const promise = fetch(url)
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => {
            return err;
        });

    return wrapPromise(promise);
}

export default fetchData;
