export const parameters = {
    ParameterType: {
        type: "string",
        enum: ["TEXT", "DATETIME", "TIME",
            "URL", "NUMBER"
        ],
        description: "type of the parameter"
    },
    Parameter: {
        type: "object",
        required: ["name", "type", "label"],
        properties: {
            name: {
                type: "string",
                description: "field name in input object"
            },
            label: {
                type: "string",
                description: "label to display in client"
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