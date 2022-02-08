import express from "express";

import UserController from "@controllers/UserController";
import authMiddleware from "../middlewares/checkJwt";

const router = express.Router();

router.get("/", authMiddleware, UserController.getCurrent);

export default router;