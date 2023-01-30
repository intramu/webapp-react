/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";

export const IsLoadingHOC = (WrappedComponent: any, loadingMessage: string) => {
    function HOC(props: any) {
        const [isLoading, setIsLoading] = useState(false);

        const setLoadingState = (isComponentLoading: boolean) => {
            setIsLoading(isComponentLoading);
        };

        return (
            <>
                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            right: "50%",
                            top: "50%",
                            transform: "translate(50%, -50%)",
                            height: "200px",
                            width: "300px",
                            backgroundColor: "grey",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            flexDirection: "column",
                        }}>
                        {loadingMessage}
                    </div>
                )}
                <WrappedComponent {...props} setLoading={setLoadingState} />
            </>
        );
    }

    return HOC;
};

// export default IsLoadingHOC;
