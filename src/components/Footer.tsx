import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    footerContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "50px",
    },
});

export default function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <div>
                <span>
                    <img src="/logo192.png" alt="logo" />
                    @2023 INTRAMU LLC, All Rights Reserved
                </span>
            </div>
        </footer>
    );
}
