declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}