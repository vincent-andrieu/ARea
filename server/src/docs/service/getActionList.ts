export const getActionList = {
    get: {
        tags: ["Service"],
        description: "Get a list of action available",
        operationId: "getActionList",
        parameters: [
            {
                name: "service",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/service"
                },
                required: false,
                description: "Service name"
            }
        ],
        responses: {
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