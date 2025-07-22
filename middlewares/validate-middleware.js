import { ErrorService } from "../services/ErrorService.js";
export default (schema) => {
    if (typeof schema !== "object" || schema === null) throw new Error("Schema is not an object");
    return async (req, res, next) => {
        const { params, body } = req;
        try {
            schema.params && (await schema.params.validateAsync(params));
            schema.body && (await schema.body.validateAsync(body));
            next();
        } catch (error) {
            next(ErrorService.BadRequestError(error.details[0].message));
        }
    };
};