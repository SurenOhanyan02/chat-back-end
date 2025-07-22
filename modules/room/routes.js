import {Router} from "express";
import { createNewRoom } from "./controller.js";

const router = Router();

router.post("/", createNewRoom);


export { router as roomRoutes };
