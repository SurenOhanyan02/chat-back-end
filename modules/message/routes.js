import { Router } from "express";
import { createNewMessage, getMessagesByRoomId } from "./controller.js";

const router = Router();
router.post("/", createNewMessage);
router.get("/:roomId", getMessagesByRoomId);

export { router as messageRoutes };
