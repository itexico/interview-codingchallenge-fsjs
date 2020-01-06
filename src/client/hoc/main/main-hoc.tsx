import * as React from "react";

export interface MainProps {
    children: React.ReactElement[];
}
export function Main (props: MainProps): React.ReactElement<MainProps> {
    const { children } = props;
    return <div className="app-layout-main">{children}</div>;
}
