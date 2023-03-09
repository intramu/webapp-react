/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Alert, Spinner } from "reactstrap";

// im havin an issue here
// export const IsLoadingHOC = (WrappedComponent: React.FunctionComponent, loadingMessage: string) => {
export const IsLoadingHOC = (WrappedComponent: any, loadingMessage: string) => {
    function HOC(props: any) {
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>();
        const [visible, setVisible] = useState<boolean>(true);

        const setLoadingState = (isComponentLoading: boolean) => {
            setIsLoading(isComponentLoading);
        };

        return (
            <>
                {isLoading && (
                    <div>
                        <Spinner>{loadingMessage}</Spinner>
                    </div>
                )}
                {error && (
                    <Alert
                        isOpen={visible}
                        toggle={() => setVisible((x) => !x)}
                        color="danger"
                        style={{
                            position: "fixed",
                            width: "80vw",
                            right: "45%",
                            bottom: "5%",
                            transform: "translate(50%, -50%)",
                        }}>
                        {error}
                    </Alert>
                )}
                <div id="pass-content" style={{ display: isLoading ? "none" : "flex" }}>
                    <WrappedComponent {...props} setLoading={setLoadingState} setError={setError} />
                </div>
            </>
        );
    }

    return HOC;
};
