// ! REVISIT
/* eslint-disable @typescript-eslint/no-explicit-any */
// data = [
//     {
//         "team_ID": 4,
//         "NAME": "Nasty Perros",
//         "WINS": 0,
//         "TIES": 0,
//         "LOSSES": 0,
//         "player_AUTH_ID": "auth0|62760b4733c477006f82c56d",
//         "FIRST_NAME": "Josh",
//         "GENDER": "MALE",
//         "ROLE": "USER"
//     },
//     {
//         "team_ID": 5,
//         "NAME": "Scooby Doos",
//         "WINS": 0,
//         "TIES": 0,
//         "LOSSES": 0,
//         "player_AUTH_ID": "auth0|62760b4733c477006f82c56d",
//         "FIRST_NAME": "Blake",
//         "GENDER": "MALE",
//         "ROLE": "USER"
//     },
//     {
//         "team_ID": 6,
//         "NAME": "Nasty Perros 2.0",
//         "WINS": 0,
//         "TIES": 0,
//         "LOSSES": 0,
//         "player_AUTH_ID": "auth0|54839452",
//         "FIRST_NAME": "Michael",
//         "GENDER": "MALE",
//         "ROLE": "USER"
//     },
//     {
//         "team_ID": 6,
//         "NAME": "Nasty Perros 2.0",
//         "WINS": 0,
//         "TIES": 0,
//         "LOSSES": 0,
//         "player_AUTH_ID": "auth0|62760b4733c477006f82c56d",
//         "FIRST_NAME": "Noah",
//         "GENDER": "MALE",
//         "ROLE": "USER"
//     }
// ]

// SELECT team.ID as team_ID, team.NAME, team.WINS, team.TIES, team.LOSSES, team.IMAGE, team.VISIBILITY, team.DATE_CREATED, team.CURRENT_TEAM_SIZE, team.MAX_TEAM_SIZE, tr.ROLE, player.FIRST_NAME, player.LAST_NAME, player.GENDER FROM team team JOIN team_roster tr on(team.ID = tr.team_ID) RIGHT JOIN player player on(tr.player_AUTH_ID = player.AUTH_ID) WHERE tr.player_AUTH_ID = "auth0|62760b4733c477006f82c56d" ORDER BY team.ID ASC

export function sort(data: any[]) {
    console.log(data);
    const list = [];
    let roster: { AUTH_ID: any; FIRST_NAME: any; LAST_NAME: any; GENDER: any; ROLE: any }[] = [];
    let team: {
        team_ID?: any;
        NAME?: any;
        WINS?: any;
        TIES?: any;
        LOSSES?: any;
        IMAGE?: any;
        VISIBILITY?: any;
        SPORT?: any;
        DATE_CREATED?: any;
        CURRENT_TEAM_SIZE?: any;
        MAX_TEAM_SIZE?: any;
        ROSTER?: any[];
    };
    let currentTeamId = data[0].team_ID;
    data.forEach(
        (element: {
            team_ID: any;
            NAME: any;
            WINS: any;
            TIES: any;
            LOSSES: any;
            IMAGE: any;
            VISIBILITY: any;
            SPORT: any;
            DATE_CREATED: any;
            CURRENT_TEAM_SIZE: any;
            MAX_TEAM_SIZE: any;
            AUTH_ID: any;
            FIRST_NAME: any;
            LAST_NAME: any;
            GENDER: any;
            ROLE: any;
        }) => {
            if (currentTeamId !== element.team_ID) {
                list.push(team);
                roster = [];
                team = {};
                currentTeamId = element.team_ID;
            }
            team = {
                team_ID: element.team_ID,
                NAME: element.NAME,
                WINS: element.WINS,
                TIES: element.TIES,
                LOSSES: element.LOSSES,
                IMAGE: element.IMAGE,
                VISIBILITY: element.VISIBILITY,
                SPORT: element.SPORT,
                DATE_CREATED: element.DATE_CREATED,
                CURRENT_TEAM_SIZE: element.CURRENT_TEAM_SIZE,
                MAX_TEAM_SIZE: element.MAX_TEAM_SIZE,
                ROSTER: roster,
            };
            roster.push({
                AUTH_ID: element.AUTH_ID,
                FIRST_NAME: element.FIRST_NAME,
                LAST_NAME: element.LAST_NAME,
                GENDER: element.GENDER,
                ROLE: element.ROLE,
            });
        }
    );
    // ! REVISIT has a valid error and should look at intent
    // list.push(team);
    // return list;
}

module.exports = {
    sort,
};

// SELECT team.ID as team_ID, team.NAME, team.WINS, team.TIES, team.LOSSES, tr.player_AUTH_ID, player.FIRST_NAME, player.GENDER, player.ROLE FROM team team JOIN team_roster tr on (team.ID = tr.team_ID) JOIN player player on (tr.player_AUTH_ID = player.AUTH_ID) WHERE team.ID = 6
