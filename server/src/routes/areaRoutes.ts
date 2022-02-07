import express from "express";
import authMiddleware from "../middlewares/checkJwt";
import AreaController from "../controllers/AreaController";

const router = express.Router();

router.post("/", authMiddleware, AreaController.create);

router.get("/list", authMiddleware, AreaController.readList);

router.get("/:id", authMiddleware, AreaController.readOne);

router.put("/:id", authMiddleware, AreaController.update);

router.delete("/:id", authMiddleware, AreaController.delete);

export default router;