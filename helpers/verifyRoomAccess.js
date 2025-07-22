import { prisma } from "../services/prisma.js";
import { ErrorService } from "../services/ErrorService.js";
export const verifyRoomAccess = async (roomId, userId) => {
	const room = await prisma.room.findFirst({
		where: { id: +roomId, participants: { some: { userId: +userId } } },
	});

	if (!room) {
		throw ErrorService.UnauthorizedError(`You do not have access to this room`);
	}
	return true;
};
