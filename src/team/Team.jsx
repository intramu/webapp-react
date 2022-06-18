import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Link, useNavigate } from "react-router-dom";
import { apiLeaveTeam } from "../common/api.ts";
import { apiShowAllPlayersTeams } from "../common/api.ts";
import { sort } from "../common/functions/sortRoster";

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
    const [playerId, setPlayerId] = useState("");
    const [pageMessage, setPageMessage] = useState("");
    const [blur, setBlur] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const showAll = async () => {
            try {
                let token = await getAccessTokenSilently();
                setPlayerId(user.sub);

                let response = await apiShowAllPlayersTeams(user.sub, token);
                console.log(response);
                if (response.data.code < 1) {
                    throw new Error("Error finding teams");
                }
                let sortedData = sort(response.data.dataPackage);
                console.log(sortedData);
                setTeams(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        showAll();
    }, []);

    const toggleBlur = () => setBlur((b) => !b);

    const leaveTeam = async (teamId) => {
        try {
            let token = await getAccessTokenSilently();
            let response = await apiLeaveTeam(token, playerId, teamId);
            console.log(response);
            if (response.data.code < 1) throw new Error("Error leaving team");

            teams.splice(
                teams.findIndex((x) => x.team_ID === teamId),
                1
            );
            setTeams(Object.values(teams));
            setPageMessage("Left teams");
        } catch (error) {
            console.log(error);
        }
    };

    const updateTeam = async (teamId) => {
        console.log("test");
        let team = teams.find((x) => x.team_ID === teamId);
        navigate("/team/update-team", { state: team });
    };

    if (teams.length === 0) {
        return (
            <main>
                <h3>
                    It doesn't look like you belong to a team. Join or create
                    one by clicking on the links below
                </h3>
                <h1>
                    <Link to={"/network"}>Join</Link> or{" "}
                    <Link to={"/team/create"}>Create</Link>
                </h1>
                <h3>** If this is incorrect please report bug **</h3>
            </main>
        );
    }
    return (
        <main className={blur ? classes.blurContainer : classes.container}>
            <h1>My Team(s)</h1>
            {teams.map((element, index) => {
                return (
                    <TeamCard
                        key={index}
                        teamId={element.team_ID}
                        sport={element.SPORT}
                        name={element.NAME}
                        wins={element.WINS}
                        ties={element.TIES}
                        losses={element.LOSSES}
                        image={element.IMAGE}
                        visibility={element.VISIBILITY}
                        dateCreated={element.DATE_CREATED}
                        currentTeamSize={element.CURRENT_TEAM_SIZE}
                        maxTeamSize={element.MAX_TEAM_SIZE}
                        roster={element.ROSTER}
                        playerId={playerId}
                        leaveTeam={leaveTeam}
                        updateTeam={updateTeam}
                        toggleBlur={toggleBlur}
                    />
                );
            })}

            {/* {pageMessage ? <Popup /> : null} */}

            <Link to={"/team/create-team"}>Create Team</Link>
        </main>
    );
}
