/** @jsxImportSource @emotion/react */
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MobxRoster } from "../../components/team/MobxRoster";
import { Schedule } from "../../components/team/Schedule";
import { TeamModel } from "../../models/TeamModel";
import {
    containerHolder,
    full,
    half,
    quarter,
    quarterHolder,
} from "../../styles/scss/player/containers";

interface testProps {
    store: TeamModel;
}
export const TestOneTeam = observer<testProps>(({ store }) => {
    const { teamId } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const test = async () => {
            const token = await getAccessTokenSilently();
            store.fetchTeam(Number(teamId), token);
        };
        test();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <span>
                <span>{store.name}</span>
                <span>Soccer</span>
            </span>

            <div css={[containerHolder]}>
                <div css={[half]}>
                    <MobxRoster
                        teamId={Number(teamId)}
                        roster={store.players ?? []}
                        removePlayer={store.removePlayer}
                    />
                </div>
                <div css={[quarterHolder]}>
                    <div css={[quarter]}>
                        <h3>Details</h3>
                    </div>
                    <div css={[quarter]}>
                        <h3>Next Game</h3>
                    </div>
                </div>
                <div css={[full]}>
                    <Schedule />
                </div>
            </div>
            {/* <MobxRoster
                    teamId={Number(teamId)}
                    roster={store.players ?? []}
                    removePlayer={store.removePlayer}
                /> */}
        </>
    );
});
