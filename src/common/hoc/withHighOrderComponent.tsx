/* eslint-disable */ 
import React, { PropsWithChildren, ReactComponentElement } from "react";

export const withHighOrderComponent = (Component: any) => (props: any) => {
    const { isLoading, data } = props;
    if (isLoading) return <div>Loading data</div>;
    if (!data) return <div>No data loaded yet</div>;
    if (!data.length) return <div>Data is empty</div>;

    /* eslint-disable react/jsx-props-no-spreading */
    return <Component {...props} />;
};
