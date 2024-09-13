import JsonWebToken from 'jsonwebtoken'

const LIMIT_JWTS = 5

export default class JWTService {
    /**
     * JWTService is a singleton
     */
    constructor () {
        if (JWTService.instance instanceof JWTService) {
            return JWTService.instance
        }
        // Actives JWTs
        this.jwts = []
        Object.freeze(this)
        JWTService.instance = this
    }

    /**
     * Generate JWT and add it to the active jwts.
     * 
     * @param {ObjectId} id
     */
    generate ({ id }) {
        const jwt = JsonWebToken.sign({ id }, process.env.JWT, { expiresIn: '30d'})
        this.add({ jwt, id })
        return jwt
    }

    /**
     * Return true if contained in jwts.
     * 
     * @param {String} jwt
     * @returns
     */
    contain (jwt) {
        for (const active in this.jwts) {
            if (active.jwt === jwt) {
                return true
            }
        }
        return false
    }

    /**
     * Add JWT to the active jwts.
     * 
     * @param {String} jwt
     * @param {ObjectId} id
     * @returns
     */
    add ({ jwt, id }) {
        const newJWT = {
            jwt,
            id,
            date: Date.now()
        }
        // Limited to 5 (cf. LIMIT_JWTS)
        if (!this.isLimitReached(id)) {
            this.jwts.push(newJWT)
            return
        }
        // The date of the oldest jwt
        let oldest
        // The index of the oldest jwt
        let index
        for (const i in this.jwts) {
           if (this.jwts[i].id.equals(id)) {
            // As oldest is undefined at the beggining, we need to set it
                if (!oldest) {
                    oldest = this.jwts[i].date
                    index = i
                } else if (oldest > this.jwts[i].date) {
                    oldest = this.jwts[i].date
                    index = i
                }
            }
        }
        // Replace the oldest jwt by the new one
        if (index) {
            this.jwts.splice(index, 1)
            this.jwts.push(newJWT)
        }
    }

    /**
     * Remove a JWT.
     * 
     * @param {String} jwt
     * @returns
     */
    remove (jwt) {
        let index
        for (const i in this.jwts) {
            if (this.jwts[i].jwt === jwt) {
                index = i
            }
        }
        if (index) {
            this.jwts.splice(index, 1)
        }
    }

    /**
     * Return true if the limit is reached.
     * 
     * @param {ObjectId} id
     * @returns
     */
    isLimitReached (id) {
        let total = 0
        for (const jwt of this.jwts) {
            if (jwt.id.equals(id)) {
                total++
            }
        }
        return total >= LIMIT_JWTS
    }

    /**
     * Remove every user's JWT.
     * 
     * @param {ObjectId} id
     * @returns
     */
    removeAll (id) {
        const activesJWT = this.jwts.filter(jwt => jwt.id.equals(id))
        for (const jwt of activesJWT) {
            let index = -1
            for (const i in this.jwts) {
                if (this.jwts[i].jwt.id === jwt.jwt.id) {
                    index = i
                    break
                }
            }
            if (index !== -1) {
                this.jwts.splice(index, 1)
            }
        }
    }
}