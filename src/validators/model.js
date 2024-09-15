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

export const order = Joi.object({
    date: Joi.date().required(),
    status: Joi.string().max(100).required(),
    totalAmount: Joi.number().required(),
    items: Joi.array().items(Joi.object({
        product_id: Joi.string().max(100).required(),
        quantity: Joi.number().required(),
    })).required()
})

export const product = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().required(),
})