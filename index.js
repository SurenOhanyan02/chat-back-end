import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router.js";

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
app.listen(4000, () => {
	console.log("Server is running on port 4000");
});
