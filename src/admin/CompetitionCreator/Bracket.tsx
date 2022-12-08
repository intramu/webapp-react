import React, { MouseEvent, ChangeEvent } from "react";
import { BracketModel } from "../models/Bracket";
import Timeslot from "./Timeslot";

function Bracket({
    leagueIndex,
    divisionIndex,
    bracketIndex,
    newList,
    setNewList,
    ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any): JSX.Element {
    const handleBracketChange = (e: ChangeEvent<HTMLInputElement>) => {
        const temp = { ...newList };
        temp.leagues[leagueIndex].divisions[divisionIndex].brackets[bracketIndex][e.target.name] =
            e.target.value;
        setNewList(temp);
    };

    // const handleCheckboxes = (leagueI, divisionI, bracketI, position) => {
    //     console.log("grab");
    //     // let temp = { ...newList };
    //     let updatedList = newList.leagues[leagueI].divisions[
    //         divisionI
    //     ].brackets[bracketI].bracketDayChoices.map((day, index) =>
    //         index === position ? !day : day
    //     );

    //     console.log(updatedList);
    //     // setNewList(updatedList)
    // };

    const addBracket = (
        e: MouseEvent<HTMLButtonElement, MouseEvent>,
        leagueI: string | number,
        divisionI: string | number
    ) => {
        // setNewList({...newList,
        const temp = { ...newList };
        temp.leagues[leagueI].divisions[divisionI].brackets.push(new BracketModel());
        setNewList(temp);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const removeBracket = (leagueI: string | number, divisionI: string | number, bracketI: any) => {
        const temp = { ...newList };
        temp.leagues[leagueI].divisions[divisionI].brackets.splice(bracketI, 1);
        setNewList(temp);
    };

    const addTimeslot = () => {
        const temp = { ...newList };
        temp.leagues[leagueIndex].divisions[divisionIndex].brackets[
            bracketIndex
        ].bracketTimeSlots.push({ startTime: "", endTime: "" });
        setNewList(temp);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTimeslotChange = (e: any, timeslotIndex: string | number) => {
        const temp = { ...newList };
        temp.leagues[leagueIndex].divisions[divisionIndex].brackets[bracketIndex].bracketTimeSlots[
            timeslotIndex
        ][e.target.name] = e.target.value;
        setNewList(temp);
    };

    return (
        <div>
            <div className={props.className}>
                <span style={{ fontSize: "18px" }}>Bracket {bracketIndex + 1}: </span>
                <label>Day Choices</label>
                <input type="text" value={props.bracket.bracketDayChoices} disabled />
                {/* {dayChoices.map((result, index) => {
                    let day = Object.values(result);
                    return (
                        <>
                            <label>{day}</label>
                            <input
                                type="checkbox"
                                value={day}
                                onChange={handleCheckboxes(
                                    leagueIndex,
                                    divisionIndex,
                                    bracketIndex,
                                    index
                                )}
                            />
                        </>
                    );
                })} */}
                {/* <input
                    type="checkbox"
                    name="bracketDayChoices"
                /> */}
                <br />
                <label>Time Slots</label>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {props.bracket.bracketTimeSlots.map((timeslot: any, index: any) => (
                    <Timeslot
                        timeslot={timeslot}
                        key={index}
                        handleInputChange={handleTimeslotChange}
                        index={index}
                    />
                ))}
                <button onClick={addTimeslot}>Add Timeslot</button>
                <br />
                <label>Max teams in bracket</label>
                <input
                    type="number"
                    name="bracketMaxSize"
                    onChange={(e) => handleBracketChange(e)}
                    value={props.bracket.bracketMaxSize}
                />
                <br />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <button onClick={(e) => addBracket(e as any, leagueIndex, divisionIndex)}>
                    Add Bracket
                </button>
                <button onClick={() => removeBracket(leagueIndex, divisionIndex, bracketIndex)}>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default Bracket;
