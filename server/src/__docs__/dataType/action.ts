export const action = {
    Action: {
        type: "object",
        required: ["type", "parameters", "service"],
        properties: {
            type: {
                type: "string",
                $ref: "#/components/schemas/ActionType",
                description: ""
            },
            service: {
                type: "object",
                $ref: "#/components/schemas/ServiceType"
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