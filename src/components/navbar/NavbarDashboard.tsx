import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarDashboard() {
    return (
        <header>
            <img id="icon" src="/logo192.png" alt="Logo" />
            <div>
                <Clock />
                <div>
                    <Link to="/profile">Profile</Link>
                </div>
                <div>
                    <img src="/settings_FILL0_wght400_GRAD0_opsz48.svg" alt="test" />
                </div>
                <div>
                    <Link to="/test">Test</Link>
                </div>
            </div>
        </header>
    );
}

function Clock() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    });
    return <div>{`${time.toDateString()} ${time.toLocaleTimeString()}`}</div>;
}
