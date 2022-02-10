export const listAreas = {
    ListAreas: {
        summary: "A list of 2 areas",
        value: [
            {
                _id: "62053a3df6aff2505445c3a1",
                trigger: {
                    inputs: {
                        username: "aypierre"
                    },
                    action: {
                        _id: "6205282d9fd44946ae101586",
                        type: "TWITCH_STREAM",
                        parameters: [
                            {
                                _id: "6205282d9fd44946ae101587",
                                name: "username",
                                label: "Username",
                                type: "TEXT"
                            }
                        ],
                        service: "TWITCH"
                    }
                },
                consequence: {
                    inputs: {
                        message: "New live on twitch"
                    },
                    reaction: {
                        _id: "6205282d9fd44946ae1015ac",
                        type: "TWITTER_MSG",
                        parameters: [
                            {
                                _id: "6205282d9fd44946ae1015ad",
                                name: "message",
                                label: "Message",
                                type: "TEXT"
                            }
                        ],
                        service: "TWITTER"
                    }
                }
            },
            {
                _id: "62052e1b9fd44946ae1015c1",
                trigger: {
                    inputs: {
                        repository: "my_uno",
                        owner: "aurelienjoncour"
                    },
                    action: {
                        _id: "6205282d9fd44946ae10159a",
                        type: "GITHUB_ISSUE",
                        parameters: [
                            {
                                _id: "6205282d9fd44946ae10159b",
                                name: "owner",
                                label: "Owner",
                                type: "TEXT"
                            },
                            {
                                _id: "6205282d9fd44946ae10159c",
                                name: "repository",
                                label: "Repository",
                                type: "TEXT"
                            }
                        ],
                        service: "GITHUB"
                    }
                },
                consequence: {
                    inputs: {
                        message: "New issue on github repository"
                    },
                    reaction: {
                        _id: "6205282d9fd44946ae1015ac",
                        type: "TWITTER_MSG",
                        parameters: [
                            {
                                _id: "6205282d9fd44946ae1015ad",
                                name: "message",
                                label: "Message",
                                type: "TEXT"
                            }
                        ],
                        service: "TWITTER"
                    }
                }
            }
        ]
    }
};