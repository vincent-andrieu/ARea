export const getArea = {
    get: {
        tags: ["Area"],
        security: [{
            bearerAuth: []
        }],
        description: "Get an area",
        operationId: "getArea",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id"
                },
                required: true,
                description: "Id of the area"
            }
        ],
        responses: {
            "401": {
                $ref: "#/components/responses/MissingToken"
            },
            "403": {
                $ref: "#/components/responses/UnauthorizedError"
            },
            "200": {
                description: "Area is obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Area"
                        }
                    }
                }
            },
            "404": {
                description: "Area not found"
            },
            "500": {
                description: "Server error"
            }
        }
    }
};