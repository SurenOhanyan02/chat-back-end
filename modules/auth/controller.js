import { response } from "express";
import * as authModel from "./model.js";



export const registration = async (req, res, next) => {
	try {
		const data = req.body;
		const user = await authModel.registration(data);

		return res.json(user);
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const {  email, password } = req.body;
		const user = await authModel.login(email, password);
		res.cookie("refreshToken", user.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Use secure cookies in production
		});
		return res.json(user);
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;
		if (refreshToken) {
			const token = await authModel.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		}
		return res.status(400).json({ message: "No refresh token provided" });
	} catch (error) {
		next(error);
	}
};


export const refresh = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}
		const user = await authModel.refresh(refreshToken);
		res.cookie("refreshToken", user.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Use secure cookies in production
		});
		return res.json(user);
	} catch (error) {
		next(error);
	}
};

export  const getMe = async (req, res, next) => {
	try {
		const user = req.user; // Assuming user is set in a previous middleware
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		return res.json({
			id: user.id,
			email: user.email,
			name: user.name,
			surname: user.surname,
		});
	} catch (error) {
		next(error);
	}
};

export const register = async (req, res, next) => {
	try {
		const data = req.body;
		const user = await authModel.registration(data);
		return res.json(user);
	} catch (error) {
		next(error);
	}
};