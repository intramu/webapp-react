export const data = [
    {
        team_ID: 4,
        NAME: "Nasty Perros",
        WINS: 0,
        TIES: 0,
        LOSSES: 0,
        SPORT: "Baseball",
        player_AUTH_ID: "auth0|62760b4733c477006f82c56d",
        FIRST_NAME: "Josh",
        GENDER: "MALE",
        ROLE: "USER",
    },
    {
        team_ID: 5,
        NAME: "Scooby Doos",
        WINS: 0,
        TIES: 0,
        LOSSES: 0,
        SPORT: "Basketball",
        player_AUTH_ID: "auth0|62760b4733c477006f82c56d",
        FIRST_NAME: "Blake",
        GENDER: "MALE",
        ROLE: "USER",
    },
    {
        team_ID: 6,
        NAME: "Nasty Perros 2.0",
        WINS: 0,
        TIES: 0,
        LOSSES: 0,
        SPORT: "Soccer",
        player_AUTH_ID: "auth0|54839452",
        FIRST_NAME: "Michael",
        GENDER: "MALE",
        ROLE: "USER",
    },
    {
        team_ID: 6,
        NAME: "Nasty Perros 2.0",
        WINS: 0,
        TIES: 0,
        LOSSES: 0,
        SPORT: "Soccer",
        player_AUTH_ID: "auth0|62760b4733c477006f82c56d",
        FIRST_NAME: "Noah",
        GENDER: "MALE",
        ROLE: "USER",
    },
];

// ! REVISIT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterList(sport: string, name: string, visibility: string, list: any[]) {
    if (sport) {
        list.findIndex((x) => x.SPORT === sport);

        console.log(list);
    }
}

// ! REVISIT
// filterList("b");
