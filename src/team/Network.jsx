import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import instance from "../endpoint";

export default function Network() {
    const [teamList, setTeamList] = useState([]);
    const { user, getAccessTokenSilently } = useAuth0();

    const joinTeam = async (teamId) => {
        let userJoinCredentials = { playerId: user.sub, teamId: teamId };
        let accessToken = await getAccessTokenSilently();

        let joinResponse = await instance.post(
            "/team/joinOpenTeam",
            userJoinCredentials,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        let j;

        switch (joinResponse.data.code) {
            case -1:
                return <div>Network Error X(</div>;
            case 0:
                console.log("Team is at max size or closed");
                break;
            case 1:
                console.log("Joined Team");
                break;
        }
    };

    useEffect(() => {
        const showAllTeams = async () => {
            let accessToken = await getAccessTokenSilently();
            console.log(accessToken);
            try {
                let response = await instance.post(
                    "/team/showAllTeams",
                    { message: "empty" },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                console.log(response);
                console.log(response.message);
                if (response.status !== 200) {
                    console.log("Fetch error to /team/showAllTeams");
                    return;
                }

                // Assigning just the result data to a variable
                let data = response.data.dataPackage;
                const test = ["Stevan", "Jacob", "Noah", "David"];
                setTeamList(
                    data.map((element, index) => {
                        console.log(element);
                        return (
                            <TeamCard
                                key={index}
                                id={element.ID}
                                name={element.NAME}
                                wins={element.WINS}
                                ties={element.TIES}
                                losses={element.LOSSES}
                                image={element.IMAGE}
                                roster={test}
                                visibility={element.VISIBILITY}
                                dateCreated={element.DATE_CREATED}
                                joinTeam={joinTeam}
                            />
                        );
                    })
                );
            } catch (error) {
                console.log("Unknown Error");
            }
        };
        showAllTeams();
    }, []);

    return <main>{teamList}</main>;
}
