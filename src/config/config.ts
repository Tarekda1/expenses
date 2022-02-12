import { IConfig } from "./interface";
const config: { [key: string]: IConfig } = {
  development: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
    secret: <string>process.env.SECRET,
    serverPort: <string>process.env.PORT,
    imgPort: <string>process.env.IMAGE_REDIRECT_PORT,
  },
  production: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
    secret: <string>process.env.SECRET,
    serverPort: <string>process.env.PORT,
    imgPort: <string>process.env.IMAGE_REDIRECT_PORT,
  },
  test: {
    database: <string>process.env.DB_NAME,
    dialect: <string>process.env.DB_DIALECT,
    host: <string>process.env.DB_HOST,
    password: <string>process.env.DB_PASS,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
    secret: <string>process.env.SECRET,
    serverPort: <string>process.env.PORT,
    imgPort: <string>process.env.IMAGE_REDIRECT_PORT,
  },
};
export default config;
