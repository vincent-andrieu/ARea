export const getArea = {
    get: {
        tags: ["Area"],
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
            "200": {
                description: "Area is obtained",
                content:{
                    "application/json": {
                        schema:{
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