import JsonWebToken from 'jsonwebtoken'
import JWTService from '../services/jwt.js'
import { Unauthorized } from '../globals/errors.js'
const JWTServiceInstance = new JWTService()

function _getJWT (req) {
    const bearerHeader = req.headers.authorization
    if (!bearerHeader) {
        throw new Unauthorized('JWT inexistant.')
    }
    const jwt = bearerHeader.split(' ')[1]
    return jwt
}

export function verify (req, res, next) {
    const jwt = _getJWT(req)
    let data
    try {
        data = JsonWebToken.verify(jwt, process.env.JWT)
    } catch (_) {
        throw new Unauthorized('JWT invalide.')
    }
    req.jwt = {
        jwt,
        data
    }

    if (!JWTServiceInstance.contain(jwt)) {
        throw new Unauthorized('Session expirée.')
    }
    
    next()
}