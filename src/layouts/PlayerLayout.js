import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const useStyles = createUseStyles({
    mainContainer: {
        minHeight: '100vh',
        position: 'relative'
    }
})

export default function PlayerLayout() {
    const classes = useStyles();

    return (
        <div className={classes.mainContainer}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}