import express from "express";
import authMiddleware from "../middlewares/checkJwt";
import ConfigController from "../controllers/ConfigController";

const router = express.Router();

router.post("/cron", authMiddleware, ConfigController.configCronSchedule);

export default router;