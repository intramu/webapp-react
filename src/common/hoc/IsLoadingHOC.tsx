/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";

// im havin an issue here
// export const IsLoadingHOC = (WrappedComponent: React.FunctionComponent, loadingMessage: string) => {
export const IsLoadingHOC = (WrappedComponent: any, loadingMessage: string) => {
    function HOC(props: any) {
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>();

        const setLoadingState = (isComponentLoading: boolean) => {
            setIsLoading(isComponentLoading);
        };

        if (error) {
            return <div>{error}</div>;
        }

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
                        <Spinner>{loadingMessage}</Spinner>
                    </div>
                )}
                {/* Do you think this is a good idea?
                The wrapped component has to be rendered or else the request in useEffect
                will not run. So I hide the component until the loading state resolves
                back to false */}
                <div style={{ display: isLoading ? "none" : "initial" }}>
                    <WrappedComponent {...props} setLoading={setLoadingState} setError={setError} />
                </div>
            </>
        );
    }

    return HOC;
};

// export default IsLoadingHOC;
