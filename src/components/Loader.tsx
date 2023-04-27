import { css, keyframes } from "@emotion/react";
import React from "react";
import { center, colors } from "../styles/player/common";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export function Loader() {
    return (
        <div css={{ height: "100%", position: "relative", backgroundColor: colors.footer }}>
            <div css={center}>
                <div
                    css={css`
                        border: 16px solid ${colors.background};
                        border-top: 16px solid ${colors.primary};
                        border-radius: 50%;
                        width: 120px;
                        height: 120px;
                        animation: ${spin} 2s linear infinite;
                    `}
                />
            </div>
        </div>
    );
}
