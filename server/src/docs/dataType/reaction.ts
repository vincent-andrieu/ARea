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
            parameters: {
                type: "object",
                $ref: "#/components/schemas/Parameters"
            }
        }
    }
};