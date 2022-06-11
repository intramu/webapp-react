import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import instance from "../endpoint";

export default function TeamView() {
    const { user } = useAuth0();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const getTeamInfo = async () => {
            try {
                let response = await instance.get("/team/showAllTeams");

                console.log(response);
                if (response.status !== 200) {
                    console.log("Fetch error to /team/showAllTeams");
                    return;
                }

                setTeams(response.data.dataPackage);
            } catch (error) {
                console.log("Unknown Error");
            }
        };
        getTeamInfo();
    }, []);

    if (teams.length === 0) {
        return (
            <main>
                <h1>Empty</h1>
            </main>
        );
    }
    return (
        <main>
            <p>{user.sub}</p>
        </main>
    );
}
