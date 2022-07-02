import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { sort } from "../common/functions/sortRoster";
import NetworkCard from "./components/NetworkCard";
import { apiJoinTeam } from "../common/api.ts";
import { apiShowAllTeams } from "../common/api.ts";

export default function Network() {
    const [teamList, setTeamList] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const { user, getAccessTokenSilently } = useAuth0();
    const [filterOptions, setFilterOptions] = useState({
        sport: "",
        name: "",
        visibility: "",
    });

    const joinTeam = async (teamId) => {
        try {
            let token = await getAccessTokenSilently();
            let response = apiJoinTeam(token, user.sub, teamId);

            if (response.data.code < 1) throw Error("Couldnt join team");
            for (let x = 0; x < teamList.length; x++) {
                if (teamList[x].team_ID === 6) {
                    let temp = { ...teamList };
                    temp[x].VISIBILITY = "CLOSED";
                    setTeamList(Object.values(temp));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const requestToJoinTeam = async (teamId) => {
        //Needs to be implemented
        console.log(teamId);
    };

    useEffect(() => {
        const showAllTeams = async () => {
            try {
                let token = await getAccessTokenSilently();
                let response = await apiShowAllTeams(token);

                console.log(response);
                console.log(response.data.message);
                if (response.data.code < 1) {
                    throw new Error("Error getting all teams");
                }

                let data = response.data.dataPackage;
                let sortedData = sort(data);
                setTeamList(sortedData);
            } catch (error) {
                console.log(error);
            }
        };

        showAllTeams();
    }, []);

    // if()

    return (
        <main>
            <h1>Network</h1>
            <h3>Search through the network of teams and find one you like</h3>
            {/* < */}
            <h2>{responseMessage ? responseMessage : ""}</h2>
            {teamList.length &&
                teamList.map((team, index) => (
                    <NetworkCard
                        key={index}
                        team={team}
                        currentPlayerId={user.sub}
                        joinTeam={joinTeam}
                        requestToJoinTeam={requestToJoinTeam}
                    />
                ))}
        </main>
    );
}
