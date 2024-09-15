import axios from 'axios'
import { ServiceUnavailable, InternalServerError } from '../globals/errors.js'

export const apiRequest = async (url, method, data = null) => {
    try {
        const options = {
            method,
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data || {}
        }

        const response = await axios(options)
        return response.data
    } catch (error) {
        if (error.response) {
            throw {
                status: error.response.status,
                message: error.response.data.message || 'Une erreur est survenue.'
            }
        } else if (error.request) {
            // The API is not responding
            throw new ServiceUnavailable()
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new InternalServerError()
        }
    }
}