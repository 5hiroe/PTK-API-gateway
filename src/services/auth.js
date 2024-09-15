import UserModel from '../models/user.js'
import { Conflict, NotFound, Forbidden } from '../globals/errors.js'
import { decrypt, encrypt } from '../helpers/encryption.js'
import JWTService from './jwt.js'
const JWTServiceInstance = new JWTService()

export default class AuthService {
    /**
     * AuthService is a singleton
     */
    constructor () {
        if (AuthService.instance instanceof AuthService) {
            return AuthService.instance
        }
        Object.freeze(this)
        AuthService.instance = this
    }

    /**
     * Signup
     * 
     * @param {String} email
     * @param {String} password
     * @param {String} name
     * @returns
     */
    // When switching the APIs to production, a confirmation email will be send to the user to validate the email address.
    // The account will not be created until the email address is validated.
    async signup ({ email, password, name }) {
        const eMailExists = await this.emailExists(email)
        if (eMailExists) {
            throw new Conflict('Cet eMail est déjà utilisé.')
        }
        const encryptedPassword = encrypt(password)
        const user = new UserModel({ email, password: encryptedPassword, name })
        await user.save()
        return user
    }

    /**
     * Login
     * 
     * @param {String} email
     * @param {String} password
     * @returns
     */
    async login ({ email, password }) {
        const user = await UserModel.findOne({ email })
        // The error message is the same for security reasons.
        // It is important to not give any information about the existence of the email address.
        if (!user) {
            throw new Forbidden('Identifiant ou mot de passe incorrect.')
        }
        const decryptedPassword = decrypt(user.password)
        if (password !== decryptedPassword) {
            throw new Forbidden('Identifiant ou mot de passe incorrect.')
        }
        const jwt = JWTServiceInstance.generate({ id: user._id })
        return jwt
    }

    /**
     * Logout
     * 
     * @param {String} jwt
     */
    async logout (jwt) {
        JWTServiceInstance.remove(jwt)
    }

    /**
     * Update password
     * 
     * @param {String} email
     * @param {String} password
     * @param {String} newPassword
     * @returns
     */
    async updatePassword ({ email, password, newPassword }) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw new NotFound('eMail inexistant.')
        }
        const decryptedPassword = decrypt(user.password)
        if (password !== decryptedPassword) {
            throw new Forbidden('Mot de passe incorrect.')
        }
        user.password = encrypt(newPassword)
        await user.save()
        JWTServiceInstance.removeAll(user._id)
        jwt = JWTServiceInstance.generate({ id: user._id })
        return jwt
    }

    /**
     * eMail exists
     * 
     * @param {String} email
     * @returns
     */
    async emailExists (email) {
        const user = await UserModel.findOne({ email })
        return user !== null
    }

    /**
     * As we currently do not have a feature to send email, we are not able to implement the following methods:
     * - forgotPassword
     * - confirmEmail
     * - resendConfirmationEmail
     */
}
