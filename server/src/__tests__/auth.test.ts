import express, { app } from "../init/express";
import supertest from "supertest";
import mongoose from "mongoose";
import Database from "../init/database";

const request = supertest(app);

/** INIT */

beforeAll(() => {
    try {
        express.connect();
        mongoose.connection.dropDatabase();
        return Database.connect();
    } catch (err) {
        console.log(err);
    }
});

// afterAll(() => {});

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
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
    });
});