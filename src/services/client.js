import { apiRequest } from '../helpers/apiRequest.js'
const clientApiUri = process.env.NODE_ENV === 'test' 
        ? process.env.CLIENT_API_URI_TEST 
        : process.env.CLIENT_API_URI;

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

    /**
     * Get client by id
     * 
     * @param {ObjectId} id
     * @returns
     */
    async getById ({ clientId }) {
        return await apiRequest(`${clientApiUri}/${clientId}`, 'GET')
    }

    /**
     * Create client
     * 
     * @param {Object} fields
     * @returns
     */
    async create ({ fields }) {
        return await apiRequest(`${clientApiUri}/`, 'POST', { fields })
    }

    /**
     * Update client
     * 
     * @param {ObjectId} clientId
     * @param {Object} fields
     * @returns
     */
    async update ({ clientId, fields }) {
        return await apiRequest(`${clientApiUri}/${clientId}`, 'PUT', { fields })
    }

    /**
     * Delete client
     * 
     * @param {ObjectId} clientId
     * @returns
     */
    async remove ({ clientId }) {
        return await apiRequest(`${clientApiUri}/${clientId}`, 'DELETE')
    }
}