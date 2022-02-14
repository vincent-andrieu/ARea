export const logout = {
    get: {
        tags: ["Auth"],
        description: "Logout an user",
        operationId: "loginUser",
        parameters: [],
        responses: {
            "200": {
                description: "Successfuly logout"
            }
        }
    }
};