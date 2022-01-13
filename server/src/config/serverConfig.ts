import { env } from "process";

const SERVER_PORT = env.SERVER_PORT || 8080;
const COOKIE_KEY = env.COOKIE_KEY || "";
const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}

export const serverConfig = {
    port: SERVER_PORT,
    cookieKey: COOKIE_KEY,
    database: {
        host: env.DB_HOST || "127.0.0.1",
        port: env.DB_PORT || 27017,
        name: env.DB_NAME
    },
    jwtSecret: JWT_SECRET
};