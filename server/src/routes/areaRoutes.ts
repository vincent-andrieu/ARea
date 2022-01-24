import express from "express";
import authMiddleware from "../middlewares/checkJwt";
import AreaController from "../controllers/AreaController";

const router = express.Router();

router.post("/", authMiddleware, AreaController.create);

router.get("/:id", authMiddleware, AreaController.readOne);

router.get("/list", authMiddleware, AreaController.readList);

router.put("/:id", authMiddleware, AreaController.update);

router.delete("/:id", authMiddleware, AreaController.delete);

export default router;