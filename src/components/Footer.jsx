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
        <footer className={classes.footerContainer}>
            <ul>
                <li>API</li>
                <li>Terms and Conditions</li>
                <li>Careers</li>
            </ul>
        </footer>
    );
}
