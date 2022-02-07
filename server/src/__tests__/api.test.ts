import { app, preinitExpress } from "../init/express";
import supertest from "supertest";

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
        await DBDataset.load();

        return await loginUser();
    } catch (err) {
        console.log(err);
    }
});

// afterAll(() => {});

/** TESTS */

// it("GET root", async () => {
//     const res = await request.get("/");
//     expect(res.statusCode).toBe(204);
// });

// describe("Authentification", () => {
//     it("POST /auth/register", async () => {
//         const res = await request.post("/auth/register")
//             .send({
//                 username: "simon",
//                 password: "racaud"
//             })
//             ;
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toHaveProperty("token");
//     });

//     it("POST /auth/register - already exist", async () => {
//         const res = await request.post("/auth/register")
//             .send({
//                 username: "simon",
//                 password: "racaud"
//             })
//             ;
//         expect(res.statusCode).toBe(409); // already exist
//     });

//     it("POST /auth/register - bad body", async () => {
//         const res = await request.post("/auth/register")
//             .send({
//                 username: "",
//                 password: ""
//             })
//             ;
//         expect(res.statusCode).toBe(400);
//     });

//     it("POST /auth/register - bad body", async () => {
//         const res = await request.post("/auth/register")
//             .send({
//                 username: "simon"
//             })
//             ;
//         expect(res.statusCode).toBe(400);
//     });

//     it("POST /auth/login", async () => {
//         const res = await request.post("/auth/login")
//             .send({
//                 username: "simon",
//                 password: "racaud"
//             })
//             ;
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("token");
//     });

//     it("POST /auth/login - bad login", async () => {
//         const res = await request.post("/auth/login")
//             .send({
//                 username: "simon2",
//                 password: "racaud"
//             })
//             ;
//         expect(res.statusCode).toBe(400);
//     });

//     it("POST /auth/login - bad login", async () => {
//         const res = await request.post("/auth/login")
//             .send({
//                 username: "simon",
//                 password: "xxx"
//             })
//             ;
//         expect(res.statusCode).toBe(400);
//     });
// });

// describe("CRUD AREA", () => {
//     it("POST /area - access right", async () => {
//         const res = await request.post("/area").send({});
//         expect(res.statusCode).toBe(403);
//     });

//     let areaId = null;
//     it("POST /area", async () => {

//         const res = await request.post("/area")
//             .send({
//                 "trigger": {
//                     "inputs": {
//                         "channelId": "xxx"
//                     },
//                     "action": {
//                         "type": "DISCORD_MSG"
//                     }
//                 },
//                 "consequence": {
//                     "inputs": {
//                         "channelId": "xxx",
//                         "message": "hello world"
//                     },
//                     "reaction": {
//                         "type": "DISCORD_MSG"
//                     }
//                 }
//             })
//             .set("Authorization", "bearer " + token);
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toHaveProperty("trigger");
//         expect(res.body).toHaveProperty("consequence");
//         expect(res.body.trigger.inputs.channelId).toBe("xxx");
//         expect(res.body.trigger.action.parameters[0].type).toBe("TEXT");
//         expect(res.body.consequence.reaction.parameters[0].type).toBe("TEXT");
//         expect(res.body.consequence.inputs.message).toBe("hello world");
//         areaId = res.body._id;
//     });

//     it("PATCH /area", async () => {
//         const res = await request.patch("/area/" + areaId)
//             .send({
//                 "trigger": {
//                     "inputs": {
//                         "time": "* * * * *"
//                     },
//                     "action": {
//                         "type": "DATE"
//                     }
//                 },
//                 "consequence": {
//                     "inputs": {
//                         "message": "hello world"
//                     },
//                     "reaction": {
//                         "type": "TWITTER_MSG"
//                     }
//                 }
//             })
//             .set("Authorization", "bearer " + token);
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("trigger");
//         expect(res.body).toHaveProperty("consequence");
//         expect(res.body.trigger.action.type).toBe("DATE");
//         expect(res.body.consequence.reaction.type).toBe("TWITTER_MSG");
//     });
// });