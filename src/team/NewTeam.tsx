import React from "react";
import InviteMembers from "./components/InviteMembers";
import CreateTeam from "./CreateTeam";

function NewTeam() {
    return (
        <div>
            <h1>Team View</h1>
            <CreateTeam />
            {/* <InviteMembers /> */}
        </div>
    );
}

export default NewTeam;
