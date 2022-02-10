export const reaction = {
    Reaction: {
        type: "object",
        required: ["type", "parameters"],
        properties: {
            type: {
                type: "object",
                $ref: "#/components/schemas/ReactionType",
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
    ReactionList: {
        type: "array",
        items: {
            $ref: "#/components/schemas/Reaction"
        }
    }
};