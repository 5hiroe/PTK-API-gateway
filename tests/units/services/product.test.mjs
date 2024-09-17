import { strict as assert } from 'assert';
import ProductService from '../../../src/services/product.js';

describe('ProductService', () => {
    let productService;
    let productToDelete = []

    before(async () => {
        productService = new ProductService();
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const newProduct1 = {
                name: "Produit 1",
                description: "Un super Produit",
                price: 6,
                stockQuantity: 10
            }

            const newProduct2 = {
                name: "Produit 2",
                description: "Un beau Produit",
                price: 12,
                stockQuantity: 100
            }

            const addProduct1 = await productService.create({ fields: newProduct1 });
            const addProduct2 = await productService.create({ fields: newProduct2 });

            const product1 = addProduct1.product;
            const product2 = addProduct2.product;

            productToDelete.push(product1._id);
            productToDelete.push(product2._id);

            //assert product1
            assert.equal(product1.name, 'Produit 1');
            assert.equal(product1.description, 'Un super Produit');
            assert.equal(product1.price, 6);
            assert.equal(product1.stockQuantity, 10);

            //assert product2
            assert.equal(product2.name, 'Produit 2');
            assert.equal(product2.description, 'Un beau Produit');
            assert.equal(product2.price, 12);
            assert.equal(product2.stockQuantity, 100);
        });
    });

    describe('getAll', () => {
        it('should return all products', async () => {
            const productsData = await productService.getAll()
            const products = productsData.products

            assert.equal(products.length, 2);
            assert.deepEqual(products[0]._id, productToDelete[0]);
            assert.deepEqual(products[1]._id, productToDelete[1]);
        });
    });

    describe('getById', () => {
        it('should return a product by ID', async () => {
            const productData = await productService.getById({ productId: productToDelete[0] });
            const product = productData.product;

            //assert product
            assert.equal(product.name, 'Produit 1');
            assert.equal(product.description, 'Un super Produit');
            assert.equal(product.price, 6);
            assert.equal(product.stockQuantity, 10);
        });
    });

    describe('update', () => {
        it('should update product details', async () => {
            const updateProduct1 = {
                name: "Produit 1",
                description: "Un super Produit",
                price: 6,
                stockQuantity: 0
            }

            const updatedProductData = await productService.update({
                productId: productToDelete[0],
                fields: updateProduct1,
            });

            const updatedProduct = updatedProductData.product;

            assert.equal(updatedProduct.stockQuantity, 0);
        });
    });

    describe('remove', () => {
        it('should remove a product by ID', async () => {
            const deletedProduct = await productService.remove({ productId: productToDelete[0] });
            const deletedProduct2 = await productService.remove({ productId: productToDelete[1] });

            assert.equal(deletedProduct.message, 'Produit supprimé.');
            assert.equal(deletedProduct2.message, 'Produit supprimé.');
        });
    });
});
