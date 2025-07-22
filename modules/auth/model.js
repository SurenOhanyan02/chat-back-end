import { ErrorService } from "../../services/ErrorService.js";
import { TokenService } from "../../services/TokenService.js";
import { prisma } from "../../services/prisma.js";

import bcrypt from "bcrypt";
export const registration = async (data) => {
	try {
		const { email, password } = data;
		const candidate = await prisma.user.findFirst({
			where: { email: email },
		});

		if (candidate) {
			throw ErrorService.BadRequestError("User already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 3);
		const user = await prisma.user.create({
			data: { ...data, password: hashedPassword },
		});

		if (!user) {
			return false;
		}
		return true;
	} catch (error) {
		throw ErrorService.BadRequestError(`Registration failed:${error.message}`);
	}
};

export const login = async (email, password) => {
	try {
		const user = await prisma.user.findFirst({
			where: { email },
		});

		if (!user) {
			throw ErrorService.BadRequestError("User not found");
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			throw ErrorService.BadRequestError("Invalid password");
		}

		const tokens = TokenService.GenerateTokens({
			id: user.id,
			email: user.email,
		});

		await TokenService.SaveToken(user.id, tokens.refreshToken);
		return {
			...tokens,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				surname: user.surname,
			},
		};
	} catch (error) {
		throw ErrorService.BadRequestError(`Login failed: ${error.message}`);
	}
};

export const logout = async (refreshToken) => {
	try {
		const token = await TokenService.RemoveToken(refreshToken);
		return token;
	} catch (error) {
		throw ErrorService.BadRequestError(`Logout failed: ${error.message}`);
	}
};

export const refresh = async (refreshToken) => {
	try {
		if (!refreshToken) {
			throw ErrorService.UnauthorizedError("User is not authorized");
		}

		const userData = TokenService.ValidateRefreshToken(refreshToken);
		if (!userData) {
			throw ErrorService.UnauthorizedError("User is not authorized");
		}

		const tokenFromDb = await TokenService.FindToken(refreshToken);
		if (!tokenFromDb) {
			throw ErrorService.UnauthorizedError("User is not authorized");
		}

		const user = await prisma.user.findUnique({
			where: { id: userData.id },
		});

		if (!user) {
			throw ErrorService.BadRequestError("User not found");
		}

		const tokens = TokenService.GenerateTokens({
			id: user.id,
			email: user.email,
		});
		await TokenService.SaveToken(user.id, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				surname: user.surname,
			},
		};
	} catch (error) {
		throw ErrorService.BadRequestError(
			`Refresh token failed: ${error.message}`
		);
	}
};





export const register = async (data) => {
	try {
		const {  email, password } = data;
		const candidate = await prisma.user.findFirst({
			where: { email: email },
		});

		if (candidate) {
			throw ErrorService.BadRequestError("User already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 3);
		const user = await prisma.user.create({
			data: { ...data, password: hashedPassword },
		});

		if (!user) {
			return false;
		}
		return user;
	} catch (error) {
		throw ErrorService.BadRequestError(`Registration failed:${error.message}`);
	}
}