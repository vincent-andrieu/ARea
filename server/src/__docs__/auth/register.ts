export const register = {
    post: {
        tags: ["Auth"],
        description: "Register a new user",
        operationId: "registerUser",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserInput"
                    },
                    examples: {
                        UserBob: {
                            $ref: "#/components/examples/UserBob"
                        }
                    }
                }
            }
        },
        responses: {
            "201": {
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
                description: "Missing field username or password"
            },
            "409": {
                description: "The user already exist"
            },
            "500": {
                description: "Server error"
            }
        }
    }
};