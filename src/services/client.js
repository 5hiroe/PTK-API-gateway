import { apiRequest } from '../helpers/apiRequest.js'
const clientApiUri = process.env.CLIENT_API_URI

export default class ClientService {
    /**
     * ClientService is a singleton
     */
    constructor () {
        if (ClientService.instance instanceof ClientService) {
            return ClientService.instance
        }
        Object.freeze(this)
        ClientService.instance = this
    }

    /**
     * Get all clients
     * 
     * @returns
     */
    async getAll () {
        return await apiRequest(`${clientApiUri}/`, 'GET')
    }
}