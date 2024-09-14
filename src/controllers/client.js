import ClientService from '../services/client.js'
const ClientServiceInstance = new ClientService()

export async function getAllClients (req, res) {
    const clients = await ClientServiceInstance.getAll()
    return res.status(200).json(clients)
}