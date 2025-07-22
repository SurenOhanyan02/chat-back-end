import Joi from "joi";

const registrationSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(8)
		.message("Password should be have minimum 8 characters")
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
		.message(
			"Password should be include uppercase and lowercase letters,numbers and symbols"
		)
		.required(),
	name: Joi.string().min(2).max(100).required(),
	surname: Joi.string().min(2).max(100).required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export default {
	registrationSchema: { body: registrationSchema },
	loginSchema: { body: loginSchema },
};
