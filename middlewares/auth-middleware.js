import { TokenService } from "../services/TokenService.js";
import { ErrorService } from "../services/ErrorService.js";
import { prisma } from "../services/prisma.js";

export default async function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ErrorService.UnauthorizedError());
		}

		const token = authorizationHeader.split(" ")[1];
		if (!token) {
			return next(ErrorService.UnauthorizedError());
		}

		const userData = TokenService.ValidateAccessToken(token);
		if (!userData) {
			return next(ErrorService.UnauthorizedError());
		}

		const user = await prisma.user.findUnique({
			where: { id: userData.id },
			select: {
				id: true,
				email: true,
				name: true,
				surname: true,
			},
		});

		if (!user) {
			return next(ErrorService.UnauthorizedError("User not found"));
		}

		req.user = user;
		return next();
	} catch (error) {
		return next(ErrorService.UnauthorizedError());
	}
}
