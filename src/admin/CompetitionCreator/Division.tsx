import React from "react";
import { DivisionModel } from "../models/Division";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Division({ leagueIndex, divisionIndex, newList, setNewList, ...props }: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addDivision = (leagueI: any) => {
        const temp = { ...newList };
        temp.leagues[leagueI].divisions.push(new DivisionModel());
        setNewList(temp);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDivisionChange = (e: any, leagueI: any, divisionI: any) => {
        const temp = { ...newList };
        temp.leagues[leagueI].divisions[divisionI][e.target.name] = e.target.value;
        setNewList(temp);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const removeDivision = (leagueI: any, divisionI: any) => {
        const temp = { ...newList };
        temp.leagues[leagueI].divisions.splice(divisionI, 1);
        setNewList(temp);
    };

    return (
        <div className={props.className}>
            <span style={{ fontSize: "18px" }}>Division {divisionIndex + 1}: </span>
            <label>Division Name: </label>
            <input
                type="text"
                name="divisionName"
                onChange={(e) => handleDivisionChange(e, leagueIndex, divisionIndex)}
                value={props.division.divisionName}
                placeholder="Optional"
            />
            <br />

            <label>Division Type: </label>
            <select
                name="divisionType"
                onChange={(e) => handleDivisionChange(e, leagueIndex, divisionIndex)}>
                <option value="mens">Mens</option>
                <option value="womens">Womens</option>
                <option value="coed">Coed</option>
            </select>

            <label>Division Level: </label>
            <select
                name="divisionLevel"
                onChange={(e) => handleDivisionChange(e, leagueIndex, divisionIndex)}>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>

            <label>Division Start Date:</label>
            <input
                type="date"
                name="divisionStartDate"
                onChange={(e) => handleDivisionChange(e, leagueIndex, divisionIndex)}
                value={props.division.divisionStartDate}
                disabled={props.datesDisabled}
            />

            <label>Division End Date:</label>
            <input
                type="date"
                name="divisionEndDate"
                onChange={(e) => handleDivisionChange(e, leagueIndex, divisionIndex)}
                value={props.division.divisionEndDate}
                disabled={props.datesDisabled}
            />

            <button onClick={() => addDivision(leagueIndex)}>Add Division</button>
            <button onClick={() => removeDivision(leagueIndex, divisionIndex)}>Remove</button>
        </div>
    );
}

export default Division;
