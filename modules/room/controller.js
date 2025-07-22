import * as roomModel from "./model.js";

export const createNewRoom = async (req, res, next) => {
	

	try {
        const { participantId } = req.body;
		const newRoom = await roomModel.createNewRoom([participantId, req.user.id]);
		res.status(201).json(newRoom);
	} catch (error) {
		next(error);
	}
};
