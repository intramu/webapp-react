import React, {
    FunctionComponent,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useEffect,
} from "react";
import { Auth0Context, useAuth0, withAuth0 } from "@auth0/auth0-react";
// import { setToken } from "./utilities/axiosInstance";

// export default function Test({ children }: { children: PropsWithChildren }) {

//     return { children };
// }

type FooProps = {
    // look here 👇
    children: ReactNode;
};

interface testthing {
    // eslint-disable-next-line react/require-default-props
    children?: React.ReactNode;
}

// eslint-disable-next-line react/function-component-definition
export const Test = (props: testthing) => {
    const { children } = props;

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const test = async () => {
            const token = await getAccessTokenSilently();
            console.log(token);

            // setToken(token);
        };
        test();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
