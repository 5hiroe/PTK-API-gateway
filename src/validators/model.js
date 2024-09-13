import Joi from 'joi'

export const user = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(128).required(),
    name: Joi.string().max(100).required()
})