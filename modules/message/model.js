import { ErrorService } from "../../services/ErrorService.js";
import { prisma } from "../../services/prisma.js";

export const createNewMessage = async (content, roomId, senderId) => {
	try {
		const newMessage = await prisma.message.create({
			data: {
				content,
				room: {
					connect: { id: roomId },
				},
				sender: {
					connect: { id: senderId },
				},
			},
		});
		return newMessage;
	} catch (error) {
		throw ErrorService.BadRequestError(
			`Failed to create message: ${error.message}`
		);
	}
};

export const getMessagesByRoomId = async (roomId) => {
	try {
		const messages = await prisma.message.findMany({
			where: { roomId: +roomId },
			include: {
				sender: {
					select: {
						id: true,
						email: true,
					},
				},
			},
			orderBy: { createdAt: "asc" },
		});
		return messages;
	} catch (error) {
		throw ErrorService.BadRequestError(
			`Failed to retrieve messages for room ${roomId}: ${error.message}`
		);
	}
};
