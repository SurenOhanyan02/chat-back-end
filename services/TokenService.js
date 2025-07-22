import jwt from "jsonwebtoken";
import { prisma } from "./prisma.js";

export class TokenService {
	static GenerateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: "30d",
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	static ValidateAccessToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		} catch (error) {
			return null;
		}
	}

	static ValidateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
		} catch (error) {
			return null;
		}
	}

	static async SaveToken(userId, refreshToken) {
		const tokenData = await prisma.token.findFirst({
			where: { userId },
		});

		if (tokenData) {
			return await prisma.token.update({
				where: { id: tokenData.id },
				data: { refreshToken },
			});
		} else {
			return await prisma.token.create({
				data: { userId, refreshToken },
			});
		}
	}

	static async RemoveToken(refreshToken) {
		if (refreshToken) {
			await prisma.token.delete({
				where: { refreshToken },
			});
			return true;
		}
		return false;
	}

	static async FindToken(refreshToken) {
		if (refreshToken) {
			await prisma.token.findFirst({
				where: { refreshToken },
			});
			return true;
		}
		return false;
	}
}
