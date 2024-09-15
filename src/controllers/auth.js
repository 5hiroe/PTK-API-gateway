import AuthService from '../services/auth.js'
import AuthValidator from '../validators/auth.js'
const AuthServiceInstance = new AuthService()
const AuthValidatorInstance = new AuthValidator()

export async function login (req, res) {
    const { body } = req
    AuthValidatorInstance.validate(body, AuthValidatorInstance.login)
    const { email, password } = body
    const jwt = await AuthServiceInstance.login({ email, password })
    res.status(200).json({ jwt })
}

export async function logout(req, res) {
    const { jwt } = req.jwt
    await AuthServiceInstance.logout(jwt)
    res.status(200).json()
}

export async function signup (req, res) {
    const { body } = req
    AuthValidatorInstance.validate(body, AuthValidatorInstance.signup)
    const user = await AuthServiceInstance.signup(body)
    res.status(200).json(user)
}

export async function updatePassword (req, res) {
    const { body } = req
    AuthValidatorInstance.validate(body, AuthValidatorInstance.updatePassword)
    const { email, password, newPassword } = body
    const jwt = await AuthServiceInstance.updatePassword({ email, password, newPassword })
    res.status(200).json({ jwt })
}