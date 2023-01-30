import React from "react";
// import Link from "next/link";

export default function Home() {
    // const handleSubmit = async () => {};
    return (
        <main id="adminMain">
            <h1>Admin home page for your organization</h1>
            <p>Please bookmark this page for easier navigation</p>
            <p>Here the master administrator will be able to add additional admins to the system</p>
            <p>
                These additional admins can modify schedules, report scores, and handle nearly
                everything related to competition
            </p>
            <p>
                For more advanced tools such as handling players and teams, the master admin must be
                logged in
            </p>
            <br />
            <p>If this is your first time accessing this page please fill ou</p>
            {/* <Link href="/admin/register">
                <a>Sign Up</a>
            </Link> */}
        </main>
    );
}
