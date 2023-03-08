import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Link, useNavigate } from "react-router-dom";
import { apiLeaveTeam, apiShowAllPlayersTeams } from "../common/api";
import useApi from "../common/hooks/useSWR";

import TeamCard from "./components/TeamCard";

const useStyles = createUseStyles({
    container: {
        position: "relative",
    },
    blurContainer: {
        filter: "blur(5px)",
    },
});
export default function Team() {
    const classes = useStyles();
    const { user, getAccessTokenSilently } = useAuth0();

    const [teams, setTeams] = useState([]);
    // ! REVISIT question if you should be using state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [playerId, setPlayerId] = useState("");
    // ! REVISIT question if you should be using state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pageMessage, setPageMessage] = useState("");
    const [blur, setBlur] = useState(false);

    const navigate = useNavigate();

    // const ApiShowAllPlayersTeams = useApi(apiShowAllPlayersTeams);

    useEffect(() => {
        const showAll = async () => {
            const token = await getAccessTokenSilently();
            if (!user) {
                throw new Error("User is not defined");
            }
            // ApiShowAllPlayersTeams.request(user.sub, token);
            // try {
            //
            //     setPlayerId(user.sub);

            //     let response = await apiShowAllPlayersTeams(user.sub, token);
            //     console.log(response);
            //     if (response.data.code < 1) {
            //         throw new Error("Error finding teams");
            //     }
            //     let sortedData = sort(response.data.dataPackage);
            //     console.log(sortedData);
            //     setTeams(sortedData);
            // } catch (error) {
            //     console.log(error);
            // }
        };
        showAll();

        // ! REVISIT this might be wrong
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleBlur = () => setBlur((b) => !b);

    // ! REVISIT from better typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leaveTeam = async (teamId: any) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await apiLeaveTeam(token, playerId, teamId);
            console.log(response);
            if (response.data.code < 1) throw new Error("Error leaving team");

            teams.splice(
                // ! REVISIT - this error might be correct
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                teams.findIndex((x: any) => x.team_ID === teamId),
                1
            );
            setTeams(Object.values(teams));
            setPageMessage("Left teams");
        } catch (error) {
            console.log(error);
        }
    };

    // ! REVISIT for better typing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const updateTeam = async (teamId: any) => {
        console.log("test");
        // ! REVISIT - this error might be correct
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const team = teams.find((x: any) => x.team_ID === teamId);
        navigate("/team/update-team", { state: team });
    };

    // if (ApiShowAllPlayersTeams.loading) return <h1>Loading</h1>;

    // if (ApiShowAllPlayersTeams.error) return <h1>Network Error </h1>;
    // if (teams.length === 0) {
    //     return (
    //         <main>
    //             <h3>
    //                 It doesn't look like you belong to a team. Join or create
    //                 one by clicking on the links below
    //             </h3>
    //             <h1>
    //                 <Link to={"/network"}>Join</Link> or{" "}
    //                 <Link to={"/team/create"}>Create</Link>
    //             </h1>
    //             <h3>** If this is incorrect please report bug **</h3>
    //         </main>
    //     );
    // }
    return (
        <main className={blur ? classes.blurContainer : classes.container}>
            <h1>My Team(s)</h1>
            {/* {ApiShowAllPlayersTeams.data?.map((team, index) => (
                <TeamCard
                    key={index}
                    team={team}
                    playerId={playerId}
                    leaveTeam={leaveTeam}
                    updateTeam={updateTeam}
                    toggleBlur={toggleBlur}
                />
            ))} */}

            {/* {pageMessage ? <Popup /> : null} */}

            <Link to="/team/create-team">Create Team</Link>
        </main>
    );
}
