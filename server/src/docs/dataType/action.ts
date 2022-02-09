export const action = {
    Action: {
        type: "object",
        required: ["type", "parameters"],
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
    },
    ActionList: {
        type: "array",
        items: {
            $ref: "#/components/schemas/Action"
        }
    }
};