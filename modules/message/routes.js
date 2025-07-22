import { Router } from "express";
import { createNewMessage } from "./controller.js";

const router = Router();
router.post("/", createNewMessage);
export { router as messageRoutes };
