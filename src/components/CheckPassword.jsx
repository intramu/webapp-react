import Popup from "reactjs-popup";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    modal: {
        fontSize: "12px",
    },
    header: {
        width: "100%",
        borderBottom: "1px solid gray",
        fontSize: "18px",
        textAlign: "center",
        padding: "5px;",
    },
    content: {
        width: "100%",
        padding: "10px 5px",
    },
    actions: {
        width: "100%",
        padding: "10px 5px",
        margin: "auto",
        textAlign: "center",
    },
    close: {
        cursor: "pointer",
        position: "absolute",
        display: "block",
        padding: "2px 5px",
        lineHeight: "20px",
        right: "-10px",
        top: "-10px",
        fontSize: "24px",
        background: "#ffffff",
        borderRadius: "18px",
        border: "1px solid #cfcece",
    },
});

function CheckPassword({ toggleBlur, leaveTeam, teamId }) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const classes = useStyles();

    const closeFunc = () => {
        if (!open) return;
        closeModal();
        toggleBlur();
    };
    const openFunc = () => {
        setOpen((o) => !o);
        toggleBlur();
    };
    return (
        <div>
            <button onClick={openFunc}>Leave</button>
            <Popup open={open} closeOnDocumentClick onClose={closeFunc} modal>
                <div className={classes.modal}>
                    <button className={classes.close} onClick={closeFunc}>
                        &times;
                    </button>
                    <div className={classes.header} />
                    <div className={classes.content}>Are you sure you want to leave the team?</div>
                    <div className={classes.actions}>
                        <button className={classes.button} onClick={closeFunc}>
                            Nevermind
                        </button>
                        <button className={classes.button} onClick={() => leaveTeam(teamId)}>
                            Yes
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default CheckPassword;
