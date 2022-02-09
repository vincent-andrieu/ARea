export const getServiceList = {
    get: {
        tags: ["Service"],
        security: [{
            bearerAuth: []
        }],
        description: "Get a list of service available",
        operationId: "getServiceList",
        parameters: [],
        responses: {
            "200": {
                description: "A list of service is obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ServiceList"
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