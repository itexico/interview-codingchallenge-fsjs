import * as React from "react";

export interface SideNavProps {
    children: React.ReactChild;
}
export function SideNav(props: SideNavProps): React.ReactElement<SideNavProps> {
    const { children } = props;
    return <div className="app-layout-side-nav">{children}</div>;
}
