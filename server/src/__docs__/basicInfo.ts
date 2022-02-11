export const basicInfo = {
    openapi: "3.0.0",
    info: {
        title: "Area Express API with Swagger",
        version: "0.1.0",
        description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html"
        },
        contact: {
            name: "LogRocket",
            url: "https://logrocket.com",
            email: "info@email.com"
        }
    },
    servers: [
        {
            url: "http://localhost:8080/"
        }
    ]
};