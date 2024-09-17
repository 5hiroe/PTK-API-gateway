import { strict as assert } from 'assert';
import OrderService from '../../../src/services/order.js';

describe('OrderService', () => {
  let orderService;
  let orderToDelete = []
  

  before(async () => {
    orderService = new OrderService();
  });

  describe('create', () => {
    it('should create a new order', async () => {
        const newOrder1 = {
            date: "2024-09-27",
            status: "pending",
            totalAmount: 6,
            items: [{
                    product_id: "66dc27b433ee277038ff84e9",
                    quantity: 1
                },
                {
                    product_id: "66dc27b433ee277038ff84e7",
                    quantity: 2
                },
            ]
        }

        const newOrder2 = {
            date: "2024-09-27",
            status: "pending",
            totalAmount: 8,
            items: [{
                    product_id: "66dc27b433ee277038ff84e9",
                    quantity: 1
                },
            ]
        }

        const addOrder1 = await orderService.create({ fields: newOrder1 });
        const addOrder2 = await orderService.create({ fields: newOrder2 });
    
        const order1 = addOrder1.order;
        const order2 = addOrder2.order;

        orderToDelete.push(order1._id);
        orderToDelete.push(order2._id);

        //assert order1
        assert.equal(order1.date, '2024-09-27T00:00:00.000Z');
        assert.equal(order1.status, 'pending');
        assert.equal(order1.totalAmount, 6);
        assert.equal(order1.items.length, 2);
        assert.equal(order1.items[0].product_id, '66dc27b433ee277038ff84e9');
        assert.equal(order1.items[0].quantity, 1);
        assert.equal(order1.items[1].product_id, '66dc27b433ee277038ff84e7');
        assert.equal(order1.items[1].quantity, 2);

        //assert order2
        assert.equal(order2.date, '2024-09-27T00:00:00.000Z');
        assert.equal(order2.status, 'pending');
        assert.equal(order2.totalAmount, 8);
        assert.equal(order2.items.length, 1);
        assert.equal(order2.items[0].product_id, '66dc27b433ee277038ff84e9');
        assert.equal(order2.items[0].quantity, 1);
    });
  });

  describe('getAll', () => {
    it('should return all orders', async () => {     
      const ordersData = await orderService.getAll()
      const orders = ordersData.orders
      
      assert.equal(orders.length, 2);
      assert.deepEqual(orders[0]._id, orderToDelete[0]);
      assert.deepEqual(orders[1]._id, orderToDelete[1]);
    });
  });

  describe('getById', () => {
    it('should return a order by ID', async () => {
      const orderData = await orderService.getById({orderId: orderToDelete[0]});
      const order = orderData.order;

      //assert order
      assert.equal(order.date, '2024-09-27T00:00:00.000Z');
      assert.equal(order.status, 'pending');
      assert.equal(order.totalAmount, 6);
      assert.equal(order.items.length, 2);
      assert.equal(order.items[0].product_id, '66dc27b433ee277038ff84e9');
      assert.equal(order.items[0].quantity, 1);
      assert.equal(order.items[1].product_id, '66dc27b433ee277038ff84e7');
      assert.equal(order.items[1].quantity, 2);
    });
  });

  describe('update', () => {
    it('should update order details', async () => {
      const updateOrder1 = {
        date: "2024-09-27",
            status: "shipped",
            totalAmount: 6,
            items: [{
                    product_id: "66dc27b433ee277038ff84e9",
                    quantity: 1
                },
                {
                    product_id: "66dc27b433ee277038ff84e7",
                    quantity: 2
                },
            ]
      }

      const updatedOrderData = await orderService.update({
        orderId: orderToDelete[0],
        fields: updateOrder1,
      });

      const updatedOrder = updatedOrderData.order;

      assert.equal(updatedOrder.status, 'shipped');
    });
  });

  describe('remove', () => {
    it('should remove a order by ID', async () => {
      const deletedOrder = await orderService.remove({ orderId: orderToDelete[0] });
      const deletedOrder2 = await orderService.remove({ orderId: orderToDelete[1] });
      
      assert.equal(deletedOrder.message, 'Commande supprimée.');
      assert.equal(deletedOrder2.message, 'Commande supprimée.');
    });
  });
});
