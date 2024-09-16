import { strict as assert } from 'assert';
import sinon from 'sinon';
import ClientService from '../../../src/services/client.js';
import { apiRequest } from '../../../src/helpers/apiRequest.js';
/*
describe('ClientService', () => {
  let clientService;

  beforeEach(() => {
    clientService = new ClientService();
    sinon.stub(apiRequest);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {
    it('should return all clients', async () => {
      apiRequest.resolves([{ name: 'Client 1' }, { name: 'Client 2' }]);
      const clients = await clientService.getAll();
      assert.deepEqual(clients, [{ name: 'Client 1' }, { name: 'Client 2' }]);
    });
  });

  describe('getById', () => {
    it('should return client by ID', async () => {
      apiRequest.resolves({ name: 'Client 1' });
      const client = await clientService.getById({ clientId: '123' });
      assert.deepEqual(client, { name: 'Client 1' });
    });
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const fields = { name: 'New Client' };
      apiRequest.resolves({ name: 'New Client' });
      const client = await clientService.create({ fields });
      assert.deepEqual(client, { name: 'New Client' });
    });
  });

  describe('update', () => {
    it('should update client details', async () => {
      const fields = { name: 'Updated Client' };
      apiRequest.resolves({ name: 'Updated Client' });
      const client = await clientService.update({ clientId: '123', fields });
      assert.deepEqual(client, { name: 'Updated Client' });
    });
  });

  describe('remove', () => {
    it('should remove client by ID', async () => {
      apiRequest.resolves({ success: true });
      const response = await clientService.remove({ clientId: '123' });
      assert.deepEqual(response, { success: true });
    });
  });
});
*/