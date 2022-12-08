import { createUseStyles } from "react-jss";
import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavItem } from "reactstrap";
import LogoutButton from "./LogoutButton";

const useStyles = createUseStyles({
    nav: {
        position: "fixed",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100vw",
        height: "8vh",
        backgroundColor: "black",
        zIndex: 1,
        // left: 0,
    },
    profile: {
        textAlign: "center",
        "& img": {
            height: "10vh",
            width: "10wv",
            borderRadius: "100px",
        },
        "& h3": {},
    },
    link: {
        backgroundColor: "#fafafa",
        textDecoration: "none",
        color: "black",
        "&:hover": {
            backgroundColor: "grey",
        },
    },
});

export default function NavbarAdmin() {
    // ! REVISIT
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const classes = useStyles();
    // const [userId, setUserId] = useState(null);

    return (
        <Navbar color="dark" expand dark>
            <NavbarBrand>Admin</NavbarBrand>
            <Collapse navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/admin" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/admin/score-reporter" className="nav-link">
                            Score Reporter
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/admin/competition-creator" className="nav-link">
                            Competition Creator
                        </Link>
                    </NavItem>
                    <NavItem>
                        <LogoutButton />
                    </NavItem>
                </Nav>
                <NavbarText>Simple Text</NavbarText>
            </Collapse>
        </Navbar>
    );
}
