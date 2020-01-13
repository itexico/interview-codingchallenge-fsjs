/// <reference types="node" />
/// <reference types="express" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
        readonly SERVER_DB_USER: string;
        readonly SERVER_DB_PASSWORD: string;
        readonly SERVER_DB_NAME: string;
        readonly SERVER_DB_HOST: string;
        readonly SERVER_DB_PORT: string;
        readonly SERVER_PORT: string;
        readonly CLIENT_HOME_ROUTE: string;
        readonly CLIENT_LOGIN_ROUTE: string;
        readonly CLIENT_REGISTER_ROUTE: string;
        readonly SERVER_DIALET: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | undefined;
    }
  }
