export const parameters = {
    ParameterType: {
        type: "string",
        enum: ["TEXT", "DATETIME", "TIME",
            "URL", "NUMBER"
        ]
    },
    Parameter: {
        type: "object",
        required: ["name", "type"],
        properties: {
            name: {
                type: "string"
            },
            type: {
                type: "object",
                $ref: "#/components/schemas/ParameterType"
            }
        }
    },
    Parameters: {
        type: "array",
        items: {
            $ref: "#/components/schemas/Parameter"
        }
    }
};