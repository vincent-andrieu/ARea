import { SwaggerParamIn, SwaggerParamType } from "../types";

export const redirectWeb = {
    get: {
        tags: ["Auth"],
        description: "Redirect to the client with the path /areas and the (ARea) token as query parameter if requests successful.",
        parameters: [
            {
                in: SwaggerParamIn.QUERY,
                name: "referer",
                schema: {
                    type: SwaggerParamType.STRING
                },
                description: "Client host."
            }
        ]
    }
};

export const redirectMobile = {
    get: {
        tags: ["Auth"],
        description: "Redirect to area:// with the (ARea) token as query parameter if requests successful."
    }
};