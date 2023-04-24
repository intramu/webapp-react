import React from "react";

/** Easter egg component that redirects user to rick roll */
export function Fake() {
    return (
        <>
            <p>Note: remove for production use</p>
            <h1>Admin Access</h1>
            <p>
                You are entering a admin access page. This should not be visible if you are a
                regular user. If you are an admin please continue.
            </p>
            <a href="https://www.youtube.com/watch?v=a3Z7zEc7AXQ" target="_blank" rel="noreferrer">
                Enter
            </a>
        </>
    );
}
