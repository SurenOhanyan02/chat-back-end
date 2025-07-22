import { prisma } from "../../services/prisma.js";
import { ErrorService } from "../../services/ErrorService.js";
export const createNewRoom = async (participants, type = "DIRECT") => {
	try {
		const newRoom = await prisma.room.create({
			data: {
				type,
				participants: {
					create: participants.map((id) => ({ userId: +id })),
				},
			},
		});
		return newRoom;
	} catch (error) {
		throw ErrorService.handleError(error, "Failed to create room");
	}
};
