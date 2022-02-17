import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Order endpoint test', () => {
	let authorization: string;
	let userId: number;

	beforeAll(async () => {
		const user_payload = {
			username: 'Test_User_4',
			password: 'testPassword4',
			firstName: 'Test',
			lastName: 'User',
		};

		const response = await request.post('/users/create').send(user_payload);
		authorization = response.body.token;

		authorization = response.body.token;
		userId = response.body.id;

		const product_payload = {
			name: 'test_product',
			price: 10,
		};
		await request
			.post('/products/create')
			.set('authorization', `Bearer ${authorization}`)
			.send(product_payload);

		const payload = {
			status: 'open',
			userId: userId,
		};

		await request
			.post('/orders/create')
			.set('authorization', `Bearer ${authorization}`)
			.send(payload);

		const order_create_payload = {
			quantity: 2,
			orderId: 1,
			productId: 1,
		};

		await request
			.post('/orders/add')
			.set('authorization', `Bearer ${authorization}`)
			.send(order_create_payload);
	});

	it('should create an order', async () => {
		const payload = {
			status: 'open',
			userId: userId,
		};
		const response = await request
			.post('/orders/create')
			.set('authorization', `Bearer ${authorization}`)
			.send(payload);
		expect(response.body.status).toBe('open');
		expect(response.body.user_id).toEqual(userId.toString());
		expect(response.body.id).toBeDefined();
	});

	it('should add a product to an order', async () => {
		const payload = {
			quantity: 1,
			orderId: 1,
			productId: 1,
		};
		const response = await request
			.post('/orders/add')
			.set('authorization', `Bearer ${authorization}`)
			.send(payload);
		expect(response.status).toBe(200);
		expect(response.body.id).toBeDefined();
		expect(response.body.quantity).toBe(1);
		expect(response.body.order_id).toBe('1');
		expect(response.body.product_id).toBe('1');
	});

	it('should get an order', async () => {
		const response = await request.get(`/orders/${1}`);
		expect(response.body.id).toBe(1);
		expect(response.body.products).toBeDefined();
		expect(response.body.status).toBeDefined();
		expect(response.body.user_id).toBeDefined();
	});
});
