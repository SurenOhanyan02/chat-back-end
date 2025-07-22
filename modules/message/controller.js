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

export const getMessagesByRoomId = async (req, res, next) => {
	try {
		const { roomId } = req.params;
		await verifyRoomAccess(roomId, req.user.id);
		const messages = await messageModel.getMessagesByRoomId(roomId);
		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};
