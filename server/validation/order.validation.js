const Joi = require("joi");

exports.createOrder = (orderBody) => {
    const orderSchema =
        Joi.object().keys({
            tableNum: Joi.string().required(),
            dateOrder: Joi.date().required(),
            // numberPeople: Joi.date().required(),
            timeOrder: Joi.string().required().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
            nameUser: Joi.string().required(),
            phoneUser: Joi.string().required(),
            // emailUser: Joi.email().required()
            // emailUser: Joi.string().required()
        })
    return orderSchema.validate(orderBody)
}