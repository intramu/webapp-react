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

// const data2 = {
//     team_ID: 6,
//     NAME: "Nasty Perros 2.0",
//     WINS: 0,
//     TIES: 0,
//     LOSSES: 0,
//     player_AUTH_ID: "auth0|62760b4733c477006f82c56d",
//     FIRST_NAME: "Noah",
//     GENDER: "MALE",
//     ROLE: "USER",
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterList(sport: string, name: string, visibility: string, list: any[]) {
    // console.log('list', list);
    if (sport)
        for (let x = 0; x < list.length; x++) {
            const element = list[x];
            if ((element.SPORT.toLowerCase().indexOf(sport.toLowerCase()) !== -1) === false) {
                list.splice(x, 1);
                x--;
            }
        }

    if (name) {
        // ! Will revisiting below should also remove purpose for ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data.forEach((element) => {
            // if (element.NAME.toLowerCase().indexOf(name.toLowerCase()) !== -1)
            // ! REVISIT there is a valid error here look at intent
            //     list.splice(element, 1);
        });
    }

    return list;
}

console.log(filterList("B", "", "", data));

// class test {}

// let x = data2.map((element, index) => {
//     if (typeof (element) === "string")
//         return element.toLowerCase()
// })
// console.log(
//     Object.keys(data2)
// )
