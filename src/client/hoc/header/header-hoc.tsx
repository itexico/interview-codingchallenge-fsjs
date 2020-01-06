import * as React from "react";

export interface HeaderProps {
    children: React.ReactElement[];
}
export function Header (props: HeaderProps): React.ReactElement<HeaderProps> {
    const { children } = props;
    return <div className="app-layout-header">{children}</div>;
}
