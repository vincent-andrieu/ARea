export const about = {
    get: {
        tag: ["About"],
        description: "Short description of service, action and reaction",
        operationId: "about",
        parameters: [],
        responses: {
            "200": {
                description: "Successfuly get the about",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                client: {
                                    type: "object",
                                    properties: {
                                        host: {
                                            type: "string",
                                            description: "ip of the client",
                                            example: "::1"
                                        }
                                    }
                                },
                                server: {
                                    type: "object",
                                    properties: {
                                        current_time: {
                                            type: "number",
                                            description: "The unix timestamp of the server",
                                            example: 1644567695
                                        },
                                        services: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: {
                                                        type: "string",
                                                        description: "The name of the service",
                                                        example: "twitter"
                                                    },
                                                    actions: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                name: {
                                                                    type: "string",
                                                                    description: "The name of the action",
                                                                    example: "TWITTER_MSG"
                                                                },
                                                                description: {
                                                                    type: "string",
                                                                    description: "The description of the action",
                                                                    example: "A new tweet is posted on twitter"
                                                                }
                                                            }
                                                        }
                                                    },
                                                    reaction: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                name: {
                                                                    type: "string",
                                                                    description: "the name of the reaction",
                                                                    example: "TWITTER_PP"
                                                                },
                                                                description: {
                                                                    type: "string",
                                                                    description: "The description of the reaction",
                                                                    example: "Change your profile picture on twitter"
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};