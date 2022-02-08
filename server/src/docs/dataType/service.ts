export const serviceResponse = {
    ServiceListItem: {
        type: "object",
        required: ["label", "haveAction", "haveReaction"],
        properties: {
            label: {
                type: "string",
                description: "name of the service"
            },
            haveAction: {
                type: "boolean",
                description: "Are they action(s) related to the service"
            },
            haveReaction: {
                type: "boolean",
                description: "Are they reaction(s) related to the service"
            }
        }
    },
    ServiceList: {
        type: "array",
        items: {
            $ref: "#/components/schemas/ServiceListItem"
        }
    }
};