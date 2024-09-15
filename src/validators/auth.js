import Validator from './validator.js'
import Joi from 'joi'
import { user } from './model.js'

export default class AuthValidator extends Validator {
    login = Joi.object({
        email: Joi.string().email().max(100).required(),
        password: Joi.string().min(8).max(128).required()
    })

    signup = user

    updatePassword = Joi.object({
        email: Joi.string().email().max(100).required(),
        password: Joi.string().min(8).max(128).required(),
        newPassword: Joi.string().min(8).max(128).required()
    })
}