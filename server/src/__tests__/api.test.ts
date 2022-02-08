import { app, preinitExpress } from "../init/express";
import supertest from "supertest";
import mongoose from "mongoose";

import DBDataset from "../init/DBDataset";

const request = supertest(app);
let token;

/** INIT */

const loginUser = async () => {
    const response = await request
        .post("/auth/register")
        .send({
            username: "test",
            password: "test"
        })
        .expect(201);
    token = response.body.token;
};

beforeAll(async () => {
    try {
        preinitExpress();
        //expressInit.connect();
        await DBDataset.init(true);

        return await loginUser();
    } catch (err) {
        console.log(err);
    }
});

afterAll(() => {
    mongoose.connection.close();
});

/** TESTS */

it("GET root", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(204);
});

describe("Authentification", () => {
    it("POST /auth/register", async () => {
        const res = await request.post("/auth/register")
            .send({
                username: "simon",
                password: "racaud"
            })
            ;
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
    });

    it("POST /auth/register - already exist", async () => {
        const res = await request.post("/auth/register")
            .send({
                username: "simon",
                password: "racaud"
            })
            ;
        expect(res.statusCode).toBe(409); // already exist
    });

    it("POST /auth/register - bad body", async () => {
        const res = await request.post("/auth/register")
            .send({
                username: "",
                password: ""
            })
            ;
        expect(res.statusCode).toBe(400);
    });

    it("POST /auth/register - bad body", async () => {
        const res = await request.post("/auth/register")
            .send({
                username: "simon"
            })
            ;
        expect(res.statusCode).toBe(400);
    });

    it("POST /auth/login", async () => {
        const res = await request.post("/auth/login")
            .send({
                username: "simon",
                password: "racaud"
            })
            ;
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("POST /auth/login - bad login", async () => {
        const res = await request.post("/auth/login")
            .send({
                username: "simon2",
                password: "racaud"
            })
            ;
        expect(res.statusCode).toBe(400);
    });

    it("POST /auth/login - bad login", async () => {
        const res = await request.post("/auth/login")
            .send({
                username: "simon",
                password: "xxx"
            })
            ;
        expect(res.statusCode).toBe(400);
    });
});

describe("CRUD AREA", () => {
    it("POST /area - access right", async () => {
        const res = await request.post("/area").send({});
        expect(res.statusCode).toBe(403);
    });

    let areaId = null;
    it("POST /area", async () => {

        const res = await request.post("/area")
            .send({
                "trigger": {
                    "inputs": {
                        "channelId": "xxx"
                    },
                    "action": {
                        "type": "DISCORD_MSG"
                    }
                },
                "consequence": {
                    "inputs": {
                        "channelId": "xxx",
                        "message": "hello world"
                    },
                    "reaction": {
                        "type": "DISCORD_MSG"
                    }
                }
            })
            .set("Authorization", "bearer " + token);
        if (res.statusCode != 201)
            console.error(res.error);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("trigger");
        expect(res.body).toHaveProperty("consequence");
        expect(res.body.trigger.inputs.channelId).toBe("xxx");
        expect(res.body.trigger.action.parameters[0].type).toBe("TEXT");
        expect(res.body.consequence.reaction.parameters[0].type).toBe("TEXT");
        expect(res.body.consequence.inputs.message).toBe("hello world");
        areaId = res.body._id;
    });

    it("PATCH /area", async () => {
        const res = await request.put("/area/" + areaId)
            .send({
                "trigger": {
                    "inputs": {
                        "time": "* * * * *"
                    },
                    "action": {
                        "type": "DATE"
                    }
                },
                "consequence": {
                    "inputs": {
                        "message": "hello world"
                    },
                    "reaction": {
                        "type": "TWITTER_MSG"
                    }
                }
            })
            .set("Authorization", "bearer " + token);
        if (res.statusCode != 200)
            console.info(res.error);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("trigger");
        expect(res.body).toHaveProperty("consequence");
        expect(res.body.trigger.action.type).toBe("DATE");
        expect(res.body.consequence.reaction.type).toBe("TWITTER_MSG");
    });

    it("GET /area", async () => {
        const res = await request.get("/area/" + areaId)
            .set("Authorization", "bearer " + token);
        if (res.statusCode != 200)
            console.error(res.error);
        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty("trigger");
        expect(res.body).toHaveProperty("consequence");
        expect(res.body.trigger.inputs.time).toBe("* * * * *");
        expect(res.body.trigger.action.type).toBe("DATE");
        expect(res.body.consequence.reaction.type).toBe("TWITTER_MSG");
        expect(res.body.consequence.inputs.message).toBe("hello world");
    });

    it("GET /area/list", async () => {
        const res = await request.get("/area/list")
            .set("Authorization", "bearer " + token);
        if (res.statusCode != 200)
            console.error(res.error);
        expect(res.statusCode).toBe(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty("trigger");
        expect(res.body[0]).toHaveProperty("consequence");
        expect(res.body[0].trigger.inputs.time).toBe("* * * * *");
        expect(res.body[0].trigger.action.type).toBe("DATE");
        expect(res.body[0].consequence.reaction.type).toBe("TWITTER_MSG");
        expect(res.body[0].consequence.inputs.message).toBe("hello world");
    });

    it("DELETE /area", async () => {
        const res = await request.delete("/area/" + areaId)
            .set("Authorization", "bearer " + token);
        if (res.statusCode != 200)
            console.error(res.error);
        expect(res.statusCode).toBe(200);
    });
});

describe("Info Service endpoints", () => {
    it("GET /service/list", async () => {
        const res = await request.get("/service/list")
            .set("Authorization", "bearer " + token);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(9);
    });

    it("GET /service/action", async () => {
        const res = await request.get("/service/action")
            .set("Authorization", "bearer " + token);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(9);
    });

    it("GET /service/action - filter", async () => {
        const res = await request.get("/service/action/GITHUB")
            .set("Authorization", "bearer " + token);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    it("GET /service/reaction - filter", async () => {
        const res = await request.get("/service/reaction/GITHUB")
            .set("Authorization", "bearer " + token);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });

    it("GET /service/reaction", async () => {
        const res = await request.get("/service/reaction")
            .set("Authorization", "bearer " + token);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(6);
    });
});