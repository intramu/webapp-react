import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../../interfaces/ErrorResponse";
import { IPlayer } from "../../interfaces/IPlayer";
import { instance } from "../../utilities/axiosInstance";
import { handleError } from "../handleApiError";

export const usePlayer = () => {
    const [player, setPlayer] = useState({ firstName: "", lastName: "", status: "", gender: "" });
    const [error, setError] = useState<ErrorResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: authLoading, error: authError, isAuthenticated } = useAuth0();

    useEffect(() => {
        setIsLoading(true);
        const request = async () => {
            await instance
                .get<IPlayer>("/players", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => setPlayer(res.data))
                .catch((err) => {
                    setError(handleError(err));
                });
        };

        setIsLoading(false);
        if (!authLoading && isAuthenticated) {
            console.log("what");

            request();
        }
    }, [authLoading, isAuthenticated]);

    return {
        player,
        error,
        isLoading,
        setIsLoading,
    };
};
