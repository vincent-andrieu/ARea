export const listAreas = {
    get: {
        tags: ["Area"],
        security: [{
            bearerAuth: []
        }],
        description: "List all the areas of an user",
        operationId: "listAreas",
        parameters: [],
        responses: {
            "401": {
                $ref: "#/components/responses/MissingToken"
            },
            "403": {
                $ref: "#/components/responses/UnauthorizedError"
            },
            "200": {
                description: "Area were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Areas"
                        },
                        examples: {
                            ListAreas: {
                                $ref: "#/components/examples/ListAreas"
                            }
                        }
                    }
                }
            },
            "404": {
                description: "Area list not found"
            }
        }
    }
};