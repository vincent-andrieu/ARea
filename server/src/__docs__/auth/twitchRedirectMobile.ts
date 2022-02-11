export const twitchRedirectMobile = {
    post: {
        tags: ["Auth"],
        description: "Get Area token with oauth2 twitch code",
        parameters: [],
        requestBody: {
            reduired: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["code"],
                        properties: {
                            code: {
                                type: "string",
                                description: "The oauth2 code provided by twitch",
                                example: "1k1xh2axqn4bjq1f6vy6vv4jpt1vez"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                }
            },
            "400": {
                description: "Missing field code"
            },
            "500": {
                description: "Server error or wrong code"
            }
        }
    }
};