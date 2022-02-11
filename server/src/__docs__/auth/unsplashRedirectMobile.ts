export const unsplashRedirectMobile = {
    post: {
        tags: ["Auth"],
        description: "Get Area token with oauth2 unsplash code",
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
                                description: "The oauth2 code provided by unsplash",
                                example: "upFBgFkZH_DepX8oT9gzm4v1XRCyRHV8jbFGewVzdwT"
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