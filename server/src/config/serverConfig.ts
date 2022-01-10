const SERVER_PORT = process.env.SERVER_PORT || 8080;
const COOKIE_KEY = process.env.COOKIE_KEY;

export const serverConfig = {
    port: SERVER_PORT,
    cookieKey: COOKIE_KEY
};