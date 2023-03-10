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
                    <Link to="/messages">Messages</Link>
                </div>
            </div>
        </header>
    );
}

function Clock() {
    const [time, setTime] = useState<Date>(new Date());
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <span>{`${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}, ${
            weekday[time.getDay()]
        } ${time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}:${time.getMinutes()} ${
            time.getHours() > 11 ? "PM" : "AM"
        }`}</span>
    );
}
