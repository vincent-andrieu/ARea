import dataType from "./dataType";
import examples from "./examples";

export const components = {
    components: {
        examples: {
            ...examples
        },
        schemas: {
            id: {
                type: "string",
                description: "An id of an area",
                example: "98f01g435796ca42dd2737bt"
            },
            AreaInput: {
                type: "object",
                required: ["trigger", "consequence"],
                properties: {
                    trigger: {
                        type: "object",
                        properties: {
                            inputs: {
                                type: "object",
                                oneOf: [
                                    { $ref: "#/components/schemas/DateTimeConfig" },
                                    { $ref: "#/components/schemas/TimeConfig" },
                                    { $ref: "#/components/schemas/TwitchStreamConfig" },
                                    { $ref: "#/components/schemas/TwitterTweetConfig" },
                                    { $ref: "#/components/schemas/RSSConfig" },
                                    { $ref: "#/components/schemas/DiscordMessageConfig" },
                                    { $ref: "#/components/schemas/GithubIssueConfig" },
                                    { $ref: "#/components/schemas/GithubPulReqConfig" }
                                    { $ref: "#/components/schemas/UnsplashPostConfig" }
                                ]
                            },
                            action: {
                                type: "object",
                                $ref: "#/components/schemas/Action",
                                description: ""
                            }
                        },
                        description: ""
                    },
                    consequence: {
                        type: "object",
                        properties: {
                            inputs: {
                                type: "object",
                                oneOf: [
                                    { $ref: "#/components/schemas/LinkedinPostConfig" },
                                    { $ref: "#/components/schemas/TwitterPostTweetConfig" },
                                    { $ref: "#/components/schemas/TwitterUpdatePictureConfig" },
                                    { $ref: "#/components/schemas/DiscordPostMsgConfig" },
                                    { $ref: "#/components/schemas/GithubCreateIssueConfig" },
                                    { $ref: "#/components/schemas/NotionAddMessageConfig" },
                                    { $ref: "#/components/schemas/DropboxUploadConfig" }
                                ]
                            },
                            reaction: {
                                type: "object",
                                $ref: "#/components/schemas/Reaction",
                                description: ""
                            }
                        },
                        description: ""
                    }
                }
            },
            Area: {
                type: "object",
                required: ["id", "trigger", "consequence"],
                properties: {
                    id: {
                        type: "object",
                        $ref: "#/components/schemas/id",
                        description: "The auto-generated id of the area."
                    },
                    trigger: {
                        type: "object",
                        properties: {
                            inputs: {
                                type: "object",
                                oneOf: [
                                    { $ref: "#/components/schemas/DateTimeConfig" },
                                    { $ref: "#/components/schemas/TimeConfig" },
                                    { $ref: "#/components/schemas/TwitchStreamConfig" },
                                    { $ref: "#/components/schemas/TwitterTweetConfig" },
                                    { $ref: "#/components/schemas/RSSConfig" },
                                    { $ref: "#/components/schemas/DiscordMessageConfig" },
                                    { $ref: "#/components/schemas/GithubIssueConfig" },
                                    { $ref: "#/components/schemas/GithubPulReqConfig" }
                                ]
                            },
                            action: {
                                type: "object",
                                $ref: "#/components/schemas/Action",
                                description: ""
                            }
                        },
                        description: ""
                    },
                    consequence: {
                        type: "object",
                        properties: {
                            inputs: {
                                type: "object",
                                oneOf: [
                                    { $ref: "#/components/schemas/TwitterPostConfig" },
                                    { $ref: "#/components/schemas/LinkedinPostConfig" },
                                    { $ref: "#/components/schemas/TwitterChangePPConfig" },
                                    { $ref: "#/components/schemas/DiscordPostMsgConfig" },
                                    { $ref: "#/components/schemas/GithubCreateIssueConfig" },
                                    { $ref: "#/components/schemas/NotionAddMessageConfig" }
                                ]
                            },
                            reaction: {
                                type: "object",
                                $ref: "#/components/schemas/Reaction",
                                description: ""
                            }
                        },
                        description: ""
                    }
                }
            },
            Areas: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/Area"
                }
            },
            ...dataType
        }
    }
};