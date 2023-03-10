/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth0 } from "@auth0/auth0-react";
import useAxios from "../common/hooks/useAxios";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { IPlayerInvite } from "../interfaces/IPlayerInvite";

// function async fetchRequests(): Promise<IPlayerInvite[]> {

//     // const { getRequest } = useAxios();

//     // const response = await getRequest<IPlayerInvite[]>("/players/requests");
//     // if (isErrorResponse(response)) {
//     //     return;
//     // }

//     // return response;
// };
