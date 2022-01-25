import express from "express";
import authMiddleware from "../middlewares/checkJwt";
import AreaController from "../controllers/AreaController";

const router = express.Router();

/**
 * @swagger
 * 
 * /area:
 *  post:
 *      summary: Create a new Area
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: The area to create
 *          schema:
 *              type: object
 *              required:
 *                - action
 *                - reaction  
 *              properties:
 *                 action:
 *                     type: object
 *                     properties:
 *                       label:
 *                          type: string
 *                       cron:
 *                          type: boolean
 *                 reaction:
 *                      type: object
 *                      properties:
 *                          label:
 *                              type: string
 */
router.post("/", authMiddleware, AreaController.create);

router.get("/list", authMiddleware, AreaController.readList);

/**
 * @swagger
 * 
 * /area/{areaId}:
 *  get:
 *      summary: Get a area by Id
 *      parameters:
 *          - in: path
 *            name: areaId
 *            schema:
 *              type: integer
 *              required: true
 *              description: Numeric ID of the area to get
 */
router.get("/:id", authMiddleware, AreaController.readOne);

router.put("/:id", authMiddleware, AreaController.update);

router.delete("/:id", authMiddleware, AreaController.delete);

export default router;