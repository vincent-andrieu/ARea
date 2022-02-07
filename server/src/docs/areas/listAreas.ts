export const listAreas = {
    get: {
        tags: ["Area"],
        description: "List all the areas of an user",
        operationId: "listAreas",
        parameters: [],
        responses: {
            "200": {
                description: "Area were obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Areas"
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