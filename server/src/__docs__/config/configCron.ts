export const configCron = {
    post: {
        tags: ["Config"],
        security: [{
            bearerAuth: []
        }],
        description: "Change action cron schedule",
        operationId: "configCron",
        parameters: [],
        requestBody: {
            required: "true",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ConfigCron"
                    }
                }
            }
        },
        responses: {
            "401": {
                $ref: "#/components/responses/MissingToken"
            },
            "403": {
                $ref: "#/components/responses/UnauthorizedError"
            },
            "200": {
                description: "Success"
            },
            "400": {
                description: "Invalid parameter or access denied"
            }
        }
    }
};