export const deleteArea = {
    delete: {
        tags: ["Area"],
        description: "Deleting an area",
        operationId: "deleteArea",
        parameters: [
            {
                name: "id",
                in: "path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required: true,
                description: "Id of the area to be deleted"
            }
        ],
        responses: {
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