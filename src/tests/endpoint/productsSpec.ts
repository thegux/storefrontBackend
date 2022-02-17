import supertest from 'supertest';
import { Product } from '../../models/products';
import app from '../../server';

const request = supertest(app);

describe('Product endpoint test', () => {
	let authorization: string;
	let referenceProduct: Product;

	beforeAll(async () => {
		const user_payload = {
			username: 'Test_User_3',
			password: 'testPassword3',
			firstName: 'Test',
			lastName: 'User',
		};

		const response = await request.post('/users/create').send(user_payload);
		authorization = response.body.token;

		const payload = {
			name: 'test_product',
			price: 10,
		};
		const productResponse = await request
			.post('/products/create')
			.set('authorization', `Bearer ${authorization}`)
			.send(payload);
		referenceProduct = productResponse.body;
	});

	it('should create a product', async () => {
		const payload = {
			name: 'test_product_2',
			price: 10,
		};
		const response = await request
			.post('/products/create')
			.set('authorization', `Bearer ${authorization}`)
			.send(payload);
		expect(response.status).toBe(200);
		expect(response.body.name).toBe('test_product_2');
		expect(response.body.price).toBe('10');
	});

	it('should get all products', async () => {
		const response = await request
			.get('/products')
			.set('authorization', `Bearer ${authorization}`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThanOrEqual(1);
	});

	it('should get a single product', async () => {
		const productId = referenceProduct.id || 0;
		const response = await request
			.get(`/products/${productId}`)
			.set('authorization', `Bearer ${authorization}`);
		expect(response.status).toBe(200);
		expect(response.body.id).toBe(productId);
		expect(response.body.name).toBe('test_product');
		expect(response.body.price).toBe('10');
	});
});
