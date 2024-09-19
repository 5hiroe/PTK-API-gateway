import { apiRequest } from '../helpers/apiRequest.js'
const orderApiUri = process.env.ORDER_API_URI;

export default class OrderService {
    /**
     * OrderService is a singleton
     */
    constructor () {
        if (OrderService.instance instanceof OrderService) {
            return OrderService.instance
        }
        Object.freeze(this)
        OrderService.instance = this
    }

    /**
     * Get all orders
     * 
     * @returns
     */
    async getAll () {
        return await apiRequest(`${orderApiUri}/`, 'GET')
    }

    /**
     * Get order by id
     * 
     * @param {ObjectId} id
     * @returns
     */
    async getById ({ orderId }) {
        return await apiRequest(`${orderApiUri}/${orderId}`, 'GET')
    }

    /**
     * Create order
     * 
     * @param {Object} fields
     * @returns
     */
    async create ({ fields }) {
        return await apiRequest(`${orderApiUri}/`, 'POST', { fields })
    }

    /**
     * Update order
     * 
     * @param {ObjectId} orderId
     * @param {Object} fields
     * @returns
     */
    async update ({ orderId, fields }) {
        return await apiRequest(`${orderApiUri}/${orderId}`, 'PUT', { fields })
    }

    /**
     * Delete order
     * 
     * @param {ObjectId} orderId
     * @returns
     */
    async remove ({ orderId }) {
        return await apiRequest(`${orderApiUri}/${orderId}`, 'DELETE')
    }
}