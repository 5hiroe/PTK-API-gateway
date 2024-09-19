import { apiRequest } from '../helpers/apiRequest.js'
const productApiUri = process.env.PRODUCT_API_URI;

export default class ProductService {
    /**
     * ProductService is a singleton
     */
    constructor () {
        if (ProductService.instance instanceof ProductService) {
            return ProductService.instance
        }
        Object.freeze(this)
        ProductService.instance = this
    }

    /**
     * Get all products
     * 
     * @returns
     */
    async getAll () {
        return await apiRequest(`${productApiUri}/`, 'GET')
    }

    /**
     * Get product by id
     * 
     * @param {ObjectId} id
     * @returns
     */
    async getById ({ productId }) {
        return await apiRequest(`${productApiUri}/${productId}`, 'GET')
    }

    /**
     * Create product
     * 
     * @param {Object} fields
     * @returns
     */
    async create ({ fields }) {
        return await apiRequest(`${productApiUri}/`, 'POST', { fields })
    }

    /**
     * Update product
     * 
     * @param {ObjectId} productId
     * @param {Object} fields
     * @returns
     */
    async update ({ productId, fields }) {
        return await apiRequest(`${productApiUri}/${productId}`, 'PUT', { fields })
    }

    /**
     * Delete product
     * 
     * @param {ObjectId} productId
     * @returns
     */
    async remove ({ productId }) {
        return await apiRequest(`${productApiUri}/${productId}`, 'DELETE')
    }
}