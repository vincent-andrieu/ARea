import express from "express";
import authMiddleware from "../middlewares/checkJwt";
import ServiceController from "../controllers/ServiceController";

const router = express.Router();

router.get("/list", authMiddleware, ServiceController.getServiceList);

router.get("/action/:service", authMiddleware, ServiceController.getActionList);
router.get("/action", authMiddleware, ServiceController.getActionList);

router.get("/reaction/:service", authMiddleware, ServiceController.getReactionList);
router.get("/reaction", authMiddleware, ServiceController.getReactionList);

export default router;