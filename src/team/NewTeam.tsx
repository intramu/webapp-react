import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import useAxios from "../common/hooks/useAxios";
import { isErrorResponse } from "../interfaces/ErrorResponse";
import { Team } from "../interfaces/Team";
import InviteMembers from "./components/InviteMembers";
import TeamCard from "./components/TeamCard";
import CreateTeam from "./CreateTeam";

function NewTeam() {
    const { getRequest } = useAxios();

    const [teams, setTeams] = useState<Team[]>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const showAll = async () => {
            setIsLoading(true);
            const response = await getRequest<Team[]>("/api/team");
            if (isErrorResponse(response)) {
                setError(response.errorMessage);
                setIsLoading(true);
                return;
            }

            setTeams(response);
        };
        showAll();
    }, []);

    if (isLoading) {
        return <div>Loading... </div>;
    }

    return (
        <div>
            <h1>Team</h1>

            {teams?.map((team, index) => {
                <TeamCard
            })}

            <Button>
                <Link style={{ textDecoration: "none", color: "white" }} to="/team/create">
                    New Team
                </Link>
            </Button>
            {/* <InviteMembers /> */}
        </div>
    );
}

export default NewTeam;
