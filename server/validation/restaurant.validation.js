const Joi = require("joi")

exports.validCreateRestaurant = (userBody) => {
    const signUpSchema =
        Joi.object().keys({
            name: Joi.string().required(),
            phone: Joi.string().required(),
            password: Joi.string()
                .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
                .required()
                .messages({
                    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
                }),
            email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).error(() => Error('Email is not valid')).required(),
            fullAdress:Joi.string().required(),
            maxChair:Joi.number().required(),
            activityTime:Joi.array(),
            profileImage: Joi.string().required()
        })
    return signUpSchema.validate(userBody);
}

exports.validLogIn = (userBody) => {
    const logInSchema =
        Joi.object().keys({
            password: Joi.string(),
            email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).error(() => Error('Email is not valid')),
        })
    return logInSchema.validate(userBody)
}
