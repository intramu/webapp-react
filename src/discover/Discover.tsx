import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

export default function Network() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [teamList, setTeamList] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [responseMessage, setResponseMessage] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, getAccessTokenSilently } = useAuth0();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filterOptions, setFilterOptions] = useState({
        sport: "",
        name: "",
        visibility: "",
    });

    // const joinTeam = async (teamId) => {
    //     try {
    //         let token = await getAccessTokenSilently();
    //         let response = apiJoinTeam(token, user.sub, teamId);

    //         if (response.data.code < 1) throw Error("Couldnt join team");
    //         for (let x = 0; x < teamList.length; x++) {
    //             if (teamList[x].team_ID === 6) {
    //                 let temp = { ...teamList };
    //                 temp[x].VISIBILITY = "CLOSED";
    //                 setTeamList(Object.values(temp));
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const requestToJoinTeam = async (teamId) => {
    //     //Needs to be implemented
    //     console.log(teamId);
    // };

    // useEffect(() => {
    //     const showAllTeams = async () => {
    //         try {
    //             let token = await getAccessTokenSilently();
    //             let response = await apiShowAllTeams(token);

    //             console.log(response);
    //             console.log(response.data.message);
    //             if (response.data.code < 1) {
    //                 throw new Error("Error getting all teams");
    //             }

    //             let data = response.data.dataPackage;
    //             let sortedData = sort(data);
    //             setTeamList(sortedData);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     showAllTeams();
    // }, []);

    // if()

    return (
        <main>
            <h1>Discover</h1>
            <h3>Discover new sports and teams to join</h3>
            {/* < */}
            <h2>{responseMessage || ""}</h2>
            {/* // ! REVISIT - Network card is not defined */}
            {/* {teamList.length &&
                teamList.map((team, index) => (
                    <NetworkCard
                        key={index}
                        team={team}
                        currentPlayerId={user.sub}
                        joinTeam={joinTeam}
                        requestToJoinTeam={requestToJoinTeam}
                    />
                ))} */}
        </main>
    );
}
