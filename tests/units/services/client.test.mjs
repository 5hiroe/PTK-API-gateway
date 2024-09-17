import { strict as assert } from 'assert';
import ClientService from '../../../src/services/client.js';

describe('ClientService', () => {
  let clientService;
  let clientToDelete = []

  before(async () => {
    clientService = new ClientService();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const newClient1 = {
        email: 'client1@example.com',
        phone: '123456789',
        lastname: 'Doe',
        firstname: 'John',
        address: {
          street: "rue",
          city: "ville",
          postalCode: "34000",
          country: "France"
        },
        orders: []
      }

      const newClient2 = {
        email: 'client2@example.com',
        phone: '987654321',
        lastname: 'Smith',
        firstname: 'Jane',
        address: {
          street: "rue",
          city: "ville",
          postalCode: "34000",
          country: "France"
        },
        orders: []
      }

      const addClient1 = await clientService.create({ fields: newClient1 });
      const addClient2 = await clientService.create({ fields: newClient2 });

      const client1 = addClient1.client;
      const client2 = addClient2.client;

      clientToDelete.push(client1._id);
      clientToDelete.push(client2._id);

      //assert client1
      assert.equal(client1.firstname, 'John');
      assert.equal(client1.lastname, 'Doe');
      assert.equal(client1.email, 'client1@example.com')
      assert.equal(client1.phone, '123456789')
      assert.equal(client1.address.street, "rue")
      assert.equal(client1.address.city, "ville")
      assert.equal(client1.address.postalCode, "34000")
      assert.equal(client1.address.country, "France")
      assert.equal(client1.orders.length, 0)

      //assert client2
      assert.equal(client2.firstname, 'Jane');
      assert.equal(client2.lastname, 'Smith');
      assert.equal(client2.email, 'client2@example.com')
      assert.equal(client2.phone, '987654321')
      assert.equal(client2.address.street, "rue")
      assert.equal(client2.address.city, "ville")
      assert.equal(client2.address.postalCode, "34000")
      assert.equal(client2.address.country, "France")
      assert.equal(client2.orders.length, 0)

    });
  });

  describe('getAll', () => {
    it('should return all clients', async () => {
      const clientsData = await clientService.getAll()
      const clients = clientsData.clients

      assert.equal(clients.length, 2);
      assert.deepEqual(clients[0].firstname, 'John');
      assert.deepEqual(clients[1].firstname, 'Jane');
    });
  });

  describe('getById', () => {
    it('should return a client by ID', async () => {
      const clientData = await clientService.getById({ clientId: clientToDelete[0] });
      const client = clientData.client;

      assert.equal(client.firstname, 'John');
      assert.equal(client.lastname, 'Doe');
      assert.equal(client.email, 'client1@example.com')
      assert.equal(client.phone, '123456789')
      assert.equal(client.address.street, "rue")
      assert.equal(client.address.city, "ville")
      assert.equal(client.address.postalCode, "34000")
      assert.equal(client.address.country, "France")
      assert.equal(client.orders.length, 0)
    });
  });

  describe('update', () => {
    it('should update client details', async () => {
      const updateClient1 = {
        email: 'client1@example.com',
        phone: '123456789',
        lastname: 'Doe',
        firstname: 'Jason',
        address: {
          street: "rue",
          city: "ville",
          postalCode: "34000",
          country: "France"
        },
        orders: []
      }

      const updatedClientData = await clientService.update({
        clientId: clientToDelete[0],
        fields: updateClient1,
      });

      const updatedClient = updatedClientData.client;

      assert.equal(updatedClient.firstname, 'Jason');
    });
  });

  describe('remove', () => {
    it('should remove a client by ID', async () => {
      const deletedClient = await clientService.remove({ clientId: clientToDelete[0] });
      const deletedClient2 = await clientService.remove({ clientId: clientToDelete[1] });

      assert.equal(deletedClient.message, 'Client supprimé.');
      assert.equal(deletedClient2.message, 'Client supprimé.');
    });
  });
});
