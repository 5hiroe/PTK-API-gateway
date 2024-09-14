import Joi from 'joi'

export const user = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(128).required(),
    name: Joi.string().max(100).required()
})

export const client = Joi.object({
    firstname: Joi.string().max(100).required(),
    lastname: Joi.string().max(100).required(),
    phone: Joi.string().max(10).required(),
    email: Joi.string().lowercase().max(100).required(),
    address: Joi.object({
        street: Joi.string().max(100).required(),
        city: Joi.string().max(100).required(),
        postalCode: Joi.string().max(10).required(),
        country: Joi.string().max(100).required()
    }).required(),
    orders: Joi.array().items(Joi.string().max(100)).required()
})