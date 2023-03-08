import React from "react";
import { Link } from "react-router-dom";
import useSWR from "../common/hooks/useSWR";
import { ITeam } from "../interfaces/ITeam";

function Sidebar() {
    const { data, isLoading } = useSWR<ITeam[]>("players/teams");
    console.log(data);

    return (
        <aside>
            <div id="profile">
                <img className="link-icon" src="/logo192.png" alt="logo" />
                <span>
                    <span>Welcome</span>
                    <br />
                    Stevan Perrino
                </span>
            </div>
            <ul>
                <li>
                    <span>
                        <Link to="/dashboard">
                            <img className="link-icon" src="/logo192.png" alt="logo" />
                            <span>Dashboard</span>
                        </Link>
                    </span>
                </li>
                <li>
                    <img className="link-icon" src="/logo192.png" alt="logo" />
                    <span>Teams</span>

                    {!isLoading && (
                        <div id="teams-links">
                            {data?.map((team, index) => (
                                <span key={index}>
                                    <Link
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "80%",
                                            whiteSpace: "nowrap",
                                            display: "inline-block",
                                        }}
                                        to={`/teams/${team.id}`}>
                                        {team.name}
                                    </Link>
                                    <img src="/logo192.png" alt="team" />
                                    <hr />
                                </span>
                            ))}
                            <span>
                                <Link to="/teams/new">Create Team</Link>
                                <img src="/logo192.png" alt="team" />
                            </span>

                            <hr />
                            <span>
                                <Link to="/network">Join Team</Link>
                                <img src="/logo192.png" alt="team" />
                            </span>
                        </div>
                    )}
                </li>
                <li>
                    <span>
                        <Link to="/network">
                            <img className="link-icon" src="/logo192.png" alt="logo" />
                            Network
                        </Link>
                    </span>
                </li>
                <li>
                    <Link to="/help">
                        <img className="link-icon" src="/logo192.png" alt="logo" />
                        <span>Help</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
