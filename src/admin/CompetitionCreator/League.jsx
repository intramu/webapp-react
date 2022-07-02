import { LeagueModel } from "../models/League.ts";

const League = ({ setNewList, newList, leagueIndex, ...props }) => {
    const addLeague = (e) => {
        let temp = { ...newList };
        temp.leagues.push(new LeagueModel());
        setNewList(temp);
    };

    const handleLeagueChange = (e, leagueI) => {
        let temp = { ...newList };
        temp.leagues[leagueI][e.target.name] = e.target.value;
        setNewList(temp);
    };

    const handleLeagueCheck = (leagueI) => {
        let temp = { ...newList };
        temp.leagues[leagueI].leagueSetsDates =
            !newList.leagues[leagueI].leagueSetsDates;
        setNewList(temp);
    };

    const removeLeague = (leagueI) => {
        let temp = { ...newList };
        temp.leagues.splice(leagueI, 1);
        setNewList(temp);
    };

    return (
        <div className={props.className}>
            <span style={{ fontSize: "18px" }}>League {leagueIndex + 1}: </span>

            <label htmlFor="leagueName">League Name:</label>
            <input
                type="text"
                name="leagueName"
                onChange={(e) => handleLeagueChange(e, leagueIndex)}
                value={props.league.leagueName}
                placeholder="Optional"
            />
            <label htmlFor="leagueSport">League Sport:</label>
            <input
                type="text"
                name="leagueSport"
                onChange={(e) => handleLeagueChange(e, leagueIndex)}
                value={props.league.leagueSport}
            />
            <label htmlFor="leagueStartDate">League Start Date:</label>
            <input
                type="date"
                name="leagueStartDate"
                onChange={(e) => handleLeagueChange(e, leagueIndex)}
                value={props.league.leagueStartDate}
            />
            <label htmlFor="leagueEndDate">League End Date:</label>
            <input
                type="date"
                name="leagueEndDate"
                onChange={(e) => handleLeagueChange(e, leagueIndex)}
                value={props.league.leagueEndDate}
            />

            <label htmlFor="leagueDetails">League Details:</label>
            <input
                type="text"
                name="leagueDetails"
                onChange={(e) => handleLeagueChange(e, leagueIndex)}
                value={props.league.leagueDetails}
            />
            <label htmlFor="leagueLinks">League Links:</label>
            <input
                type="text"
                name="leagueLinks"
                onChange={(e) => handleLeagueChange(e, leagueIndex)}
                value={props.league.leagueLinks}
            />
            <label htmlFor="leagueSetsDates">
                Does the league set dates for every division?
            </label>
            <input
                type="checkbox"
                name="leagueSetsDates"
                onChange={() => handleLeagueCheck(leagueIndex)}
                checked={props.league.leagueSetsDates}
            />

            <br />
            <button onClick={(e) => addLeague(e)}>Add League</button>
            <button onClick={() => removeLeague(leagueIndex)}>Remove</button>
        </div>
    );
};

export default League;
