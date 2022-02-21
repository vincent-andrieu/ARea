export const getUser = {
    get: {
        tags: ["User"],
        security: [{
            bearerAuth: []
        }],
        description: "Get information about user authenticated",
        operationId: "getUser",
        parameters: [],
        responses: {
            "401": {
                $ref: "#/components/responses/MissingToken"
            },
            "403": {
                $ref: "#/components/responses/UnauthorizedError"
            },
            "200": {
                description: "User is obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User"
                        }
                    }
                }
            },
            "404": {
                description: "User not found"
            }
        }
    }
};