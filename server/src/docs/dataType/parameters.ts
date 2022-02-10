export const parameters = {
    ParameterType: {
        type: "string",
        enum: ["TEXT", "DATETIME", "TIME",
            "URL", "NUMBER"
        ]
    },
    Parameter: {
        type: "object",
        required: ["name", "type", "label"],
        properties: {
            name: {
                type: "string"
            },
            label: {
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