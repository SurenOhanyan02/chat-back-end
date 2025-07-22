import { verifyRoomAccess } from "../../helpers/verifyRoomAccess.js";
import * as messageModel from "./model.js";

export const createNewMessage = async (req, res, next) => {
	try {
		const { content, roomId } = req.body;
		console.log(
			"Creating new message with content:",
			content,
			"for roomId:",
			roomId
		);
		const senderId = req.user.id;
		await verifyRoomAccess(roomId, senderId);
		const newMessage = await messageModel.createNewMessage(
			content,
			roomId,
			senderId
		);
		res.status(201).json(newMessage);
	} catch (error) {
		next(error);
	}
};


