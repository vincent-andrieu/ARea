export const updateArea = {
    put: {
        tags: ["Area"],
        description: "Update an area",
        operationId: "updateArea",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id"
                },
                required: true,
                description: "Id of the area to be updated"
            }
        ],
        responses: {
            "200": {
                description: "Area updated successfully"
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