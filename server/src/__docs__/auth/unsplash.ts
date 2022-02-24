import { SwaggerParamIn, SwaggerParamType } from "../types";

export const unsplashAuth = {
    get: {
        tags: ["Auth"],
        description: "Redirect to unsplash auth page and then redirect to /auth/unsplash/redirect",
        parameters: [
            {
                in: SwaggerParamIn.HEADER,
                name: "Referer",
                schema: {
                    type: SwaggerParamType.STRING
                },
                description: "Client host. Required from web app. Optional from mobile."
            },
            {
                in: SwaggerParamIn.QUERY,
                name: "token",
                schema: {
                    type: SwaggerParamType.STRING
                },
                description: "ARea token. Optional for login and register."
            },
            {
                in: SwaggerParamIn.QUERY,
                name: "mobile",
                schema: {
                    type: SwaggerParamType.BOOLEAN
                },
                description: "Is from a mobile."
            }
        ]
    }
};

export const unsplashAuthRedirect = {
    get: {
        tags: ["Auth"],
        description: "Redirect to /auth/redirect/web or /auth/redirect/web",
        parameters: [
            {
                in: SwaggerParamIn.QUERY,
                name: "state",
                schema: {
                    type: SwaggerParamType.STRING
                },
                description: "State passed to the service."
            },
            {
                in: SwaggerParamIn.QUERY,
                name: "code",
                schema: {
                    type: SwaggerParamType.STRING
                },
                description: "Code return by the service."
            }
        ],
        responses: {
            400: {
                description: "Undefined referer"
            }
        }
    }
};