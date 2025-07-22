import { Router } from "express";
import { authRoutes } from "./modules/auth/routes.js";
import { messageRoutes } from "./modules/message/routes.js";
import authMiddleware from "./middlewares/auth-middleware.js";
const router = new Router();


router.use("/auth", authRoutes);
router.use("/chat", authMiddleware, messageRoutes);
export {router};