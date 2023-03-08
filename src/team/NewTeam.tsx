import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import useAxios from "../common/hooks/useAxios";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { ITeam } from "../interfaces/ITeam";
import InviteMembers from "./components/InviteMembers";
// import TeamCard from "./components/NewTeamCard";
import CreateTeam from "./CreateTeam";

const teamList = [
    {
        id: 1,
        name: "Affordable Christians",
        wins: 2,
        ties: 0,
        losses: 0,
        image: "",
        visibility: "PRIVATE",
        sport: "SOCCER",
        dateCreated: new Date(),
        sportsmanshipScore: 4.0,
        status: "ACTIVE",
        maxTeamSize: 12,
        players: [
            {
                authId: "player1",
                role: "CAPTAIN",
                firstName: "Noah",
                lastName: "Roerig",
                gender: "MALE",
                status: "ACTIVE",
                image: "",
            },
        ],
        organizationId: "dd",
        bracketId: 1,
    },
];

function NewTeam() {
    const { getRequest } = useAxios();

    const [teams, setTeams] = useState<ITeam[]>(teamList);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const showAll = async () => {
            setIsLoading(true);
            const response = await getRequest<ITeam[]>("/api/team/");
            if (isErrorResponse(response)) {
                setError(response.errorMessage);
                setIsLoading(true);
                return;
            }

            setTeams(response);
            setIsLoading(false);
        };
        showAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // if (error) {
    //     return <div>Error</div>;
    // }
    // if (isLoading) {
    //     return <div>Loading... </div>;
    // }

    return (
        <div>
            <h1>Team</h1>

            {teams.length === 0 && <p>Your not on a team</p>}

            {/* {teams?.map((team, index) => (
                <TeamCard key={index} team={team} />
            ))} */}

            <Button>
                <Link style={{ textDecoration: "none", color: "white" }} to="/team/create">
                    New Team
                </Link>
            </Button>
            <Button>
                <Link style={{ textDecoration: "none", color: "white" }} to="/team/create">
                    Join Team
                </Link>
            </Button>
            {/* <InviteMembers /> */}
        </div>
    );
}

export default NewTeam;
