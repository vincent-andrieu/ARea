export const getAllReaction = {
    get: {
        tags: ["Service"],
        security: [{
            bearerAuth: []
        }],
        description: "Get all the reaction available on the app",
        operationId: "getAllReaction",
        parameters: [],
        responses: {
            "400": {
                description: "Missing or wrong params"
            },
            "401": {
                $ref: "#/components/responses/MissingToken"
            },
            "403": {
                $ref: "#/components/responses/UnauthorizedError"
            },
            "200": {
                description: "A list of reaction is obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ReactionList"
                        }
                    }
                }
            },
            "500": {
                description: "Server error"
            }
        }
    }
};