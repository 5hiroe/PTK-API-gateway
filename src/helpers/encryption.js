import crypto from 'crypto-js'

/**
 * Encrypt password
 * 
 * @param {String} password
 * @returns
 */
export function encrypt (password) {
    return crypto.AES.encrypt(password, process.env.KEY_ENCRYPT).toString()
}

/**
 * Decrypt password
 * 
 * @param {String} password
 * @returns
 */
export function decrypt (password) {
    const bytes = crypto.AES.decrypt(password, process.env.KEY_ENCRYPT)
    return bytes.toString(crypto.enc.Utf8)
}