import * as React from "react";
import Loadable from "react-loadable";

export const Home = Loadable({
    loader(): Promise<React.ComponentType | { default: React.ComponentType }> {
        return import("./home-contaier").then((home) => home);
    },
    loading() {
        return <span>Loading</span>;
    },
});
