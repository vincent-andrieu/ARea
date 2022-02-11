export const deleteArea = {
    delete: {
        tags: ["Area"],
        security: [{
            bearerAuth: []
        }],
        description: "Deleting an area",
        operationId: "deleteArea",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id"
                },
                required: true,
                description: "Id of the area to be deleted"
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
                description: "Area deleted successfully"
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