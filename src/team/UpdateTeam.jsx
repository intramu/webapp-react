import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUpdateTeam } from "../common/api.ts";

export default function UpdateTeam() {
    const { state } = useLocation();
    const [updatedTeam, setUpdatedTeam] = useState(state);
    const { user, getAccessTokenSilently } = useAuth0();
    // console.log(updatedTeam.VISIBILITY);
    // updatedTeam.VISIBILITY.toLowerCase();

    const handleInputChange = (e) => {
        setUpdatedTeam({
            ...updatedTeam,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        console.log("test");
        const token = await getAccessTokenSilently();
        const response = await apiUpdateTeam(token, user.sub, updatedTeam);
        console.log(response);
    };

    return (
        <div>
            <h1>Update Team</h1>
            <form>
                <label>Name</label>
                <input
                    name="NAME"
                    type="text"
                    required
                    value={updatedTeam.NAME}
                    onChange={handleInputChange}
                />
                <br />
                <label>Image</label>
                <input
                    name="IMAGE"
                    type="text"
                    required
                    value={updatedTeam.IMAGE}
                    onChange={handleInputChange}
                />
                <br />
                <label>Visbility</label>
                <select
                    value={updatedTeam.VISIBILITY}
                    name="VISIBILITY"
                    required
                    onChange={handleInputChange}
                >
                    <option value="PRIVATE">Private</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
                <br />
                <label>Sport</label>
                <input
                    name="SPORT"
                    type="text"
                    required
                    value={updatedTeam.SPORT}
                    onChange={handleInputChange}
                />
            </form>
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
}
