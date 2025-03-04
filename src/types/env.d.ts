declare namespace NodeJS {
  type ProcessEnv = {
    APP_NAME: string;
    APP_PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_URL: string;
  };
}
