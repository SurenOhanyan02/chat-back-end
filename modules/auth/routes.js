import { Router } from "express";
import { registration, login, logout, refresh, getMe, register } from "./controller.js";
import validateMiddleware from "../../middlewares/validate-middleware.js";
import validations from "./validations.js";
import authMiddleware from "../../middlewares/auth-middleware.js";


const { registrationSchema, loginSchema } = validations;

const router = new Router();

router.post(
	"/registration",
	validateMiddleware(registrationSchema),
	registration
);
router.post("/login", validateMiddleware(loginSchema), login);
router.post("/register", validateMiddleware(registrationSchema), register);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me",authMiddleware, getMe);


export { router as authRoutes };
