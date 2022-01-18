import express from "express";
import authMiddleware from "../middlewares/checkJwt";
import AreaController from "../controllers/AreaController";

const router = express.Router();

router.post("/area", authMiddleware, AreaController.create);

router.get("/area:id", authMiddleware, AreaController.readOne);

router.get("/area:username", authMiddleware, AreaController.readList);

router.put("/area:id", authMiddleware, AreaController.update);

router.delete("/area:id", authMiddleware, AreaController.delete);

export default router;