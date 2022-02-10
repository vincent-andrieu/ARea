export const getAllAction = {
    get: {
        tags: ["Service"],
        security: [{
            bearerAuth: []
        }],
        description: "Get all the action available on the app",
        operationId: "getAllAction",
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
                description: "A list of action is obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ActionList"
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