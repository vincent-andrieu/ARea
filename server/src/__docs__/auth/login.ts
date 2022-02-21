export const login = {
    post: {
        tags: ["Auth"],
        description: "Login as user",
        operationId: "loginUser",
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
            "200": {
                description: "Successfuly login",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                }
            },
            "400": {
                description: "Missing field or invalid credential"
            },
            "500": {
                description: "Server error"
            }
        }
    }
};