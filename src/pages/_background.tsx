import React, { useEffect } from "react";
import { Outlet, Route } from "react-router-dom";
import useAxios from "../common/hooks/useAxios";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IPlayer } from "../interfaces/IPlayer";

export function Background() {
    const { getRequest } = useAxios();

    useEffect(() => {
        const response = getRequest<IPlayer>("/players");
        if (isErrorResponse(response)) {
            console.log(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     const fetch = async () => {
    //         const response = await newGetRequest<IPlayer>("/players");
    //         console.log(response);

    //         if (isErrorResponse(response)) {
    //             console.log("error in background");

    //             if (response.statusCode === 404) {
    //                 navigate("/finish-profile");
    //             }
    //         }
    //     };

    //     if (location.pathname !== "/finish-profile") {
    //         fetch();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location]);

    return <Outlet />;
}
