export const userInput = {
    UserInput: {
        type: "object",
        required: ["username", "password"],
        properties: {
            username: {
                type: "string",
                description: "The username of the account",
                example: "bob"
            },
            password: {
                type: "string",
                description: "Account password",
                example: "password"
            }
        }
    }
};