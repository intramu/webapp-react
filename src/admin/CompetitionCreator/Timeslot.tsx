/* eslint-disable react/destructuring-assignment */
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Timeslot(props: any) {
    console.log(props.timeslot);
    return (
        <>
            <label>Start time</label>
            <input
                name="startTime"
                onChange={(e) => props.handleInputChange(e, props.index)}
                type="time"
                value={props.timeslot.startTime}
            />
            <label>End Time</label>
            <input
                name="endTime"
                onChange={(e) => props.handleInputChange(e, props.index)}
                value={props.timeslot.endTime}
                type="time"
            />
        </>
    );
}
