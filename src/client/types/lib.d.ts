declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test";
        readonly PUBLIC_URL: string;
        readonly ROUTE_HOME: string;
        readonly ROUTE_LOGIN: string;
        readonly ROUTE_REGISTER: string;
        readonly API_LOGIN: string;
        readonly API_REGISTER: string;
    }

    interface HotOpts {
        accept: (path: string, callback: () => void) => void;
    }

    interface Module {
        hot: HotOpts;
    }
}
