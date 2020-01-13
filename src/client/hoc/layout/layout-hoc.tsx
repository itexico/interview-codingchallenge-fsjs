import * as React from "react";

export interface LayoutProps {
    children: React.ReactElement;
}
export function Layout(props: LayoutProps): React.ReactElement<LayoutProps> {
    const { children } = props;
    return <div className="app-layout">{children}</div>;
}
