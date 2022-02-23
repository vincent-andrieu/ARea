export const twitterRedirectMobile = {
    post: {
        tags: ["Auth"],
        description: "Get Area token with oauth2 twitter credentials",
        parameters: [],
        requestBody: {
            reduired: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["oauth_token", "oauth_verifier"],
                        properties: {
                            oauth_token: {
                                type: "string",
                                description: "The oauth oauth_token provided by twitter",
                                example: "mlRgbwAAAAABYFMSAAABftgDY5c"
                            },
                            oauth_verifier: {
                                type: "string",
                                description: "The oauth oauth_verifier provided by twitter",
                                example: "lKzRR7qEjPFp9PADI2ruqCCWXf7QXPc3"
                            },
                            token: {
                                type: "string",
                                description: "ARea token if the user is login",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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