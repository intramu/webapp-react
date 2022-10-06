import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarAdmin from "../components/NavbarAdmin";

const useStyles = createUseStyles({
    mainContainer: {
        minHeight: "100vh",
        position: "relative",
        // paddingTop: '9vh'
    },

    content: {
        marginTop: "5vh",
    },
});

export default function AdminLayout() {
    const classes = useStyles();

    return (
        <div className={classes.mainContainer}>
            <NavbarAdmin />
            <Outlet />
            <Footer />
        </div>
    );
}
