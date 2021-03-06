export const createArea = {
    post: {
        tags: ["Area"],
        security: [{
            bearerAuth: []
        }],
        description: "Create a new Area",
        operationId: "createArea",
        parameters: [],
        requestBody: {
            required: "true",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/AreaInput"
                    },
                    examples: {
                        TwitterTwitch: {
                            $ref: "#/components/examples/TwitterTwitch"
                        }
                    }
                }
            }
        },
        responses: {
            "401": {
                $ref: "#/components/responses/MissingToken"
            },
            "403": {
                $ref: "#/components/responses/UnauthorizedError"
            },
            "201": {
                description: "Area created successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Area"
                        }
                    }
                }
            },
            "400": {
                description: "Invalid body"
            },
            "500": {
                description: "Server error"
            }
        }
    }
};