export const action = {
    Action: {
        type: "object",
        required: ["type", "cron", "parameters"],
        properties: {
            type: {
                type: "string",
                $ref: "#/components/schemas/ActionType",
                description: ""
            },
            cron: {
                type: "boolean",
                description: ""
            },
            parameters: {
                type: "object",
                $ref: "#/components/schemas/Parameters"
            }
        }
    }
};