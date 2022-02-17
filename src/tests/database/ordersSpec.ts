import OrderTable, { Order } from '../../models/orders';
import ProductTable, { Product } from '../../models/products';
import UserTable, { User } from '../../models/users';

const productStore = new ProductTable();
const userStore = new UserTable();

const store = new OrderTable();

describe('order database tests', () => {
	let refernceUserOrder: User;
	let referenceProductOrder: Product;
	let referenceOrder: Order;

	beforeAll(async () => {
		const orderUser: User = {
			first_name: 'order',
			last_name: 'user',
			username: 'order_user',
			password: 'order_user_password',
		};
		refernceUserOrder = await userStore.create(orderUser);

		const orderProduct: Product = {
			name: 'order_product',
			price: 20,
		};
		referenceProductOrder = await productStore.create(orderProduct);

		const userId = refernceUserOrder.id || 0;
		referenceOrder = await store.create('active', userId);
	});

	it('should create an order', async () => {
		const userId = refernceUserOrder.id || 0;
		const response = await store.create('complete', userId);

		expect(response.id).toBeDefined();
		expect(response.status).toBe('complete');
	});

	it('should get an order', async () => {
		const orderId = referenceOrder.id || 0;
		const response = await store.show(orderId);

		expect(response.id).toBeDefined();
		expect(response.status).toBe(referenceOrder.status);
	});

	it('should add a product to an order', async () => {
		const orderId = referenceOrder.id || 0;
		const productId = referenceProductOrder.id || 0;

		const response = await store.addProduct(2, orderId, productId);

		expect(Number(response.order_id)).toEqual(orderId);
		expect(Number(response.product_id)).toEqual(productId);
		expect(response.quantity).toBe(2);
		expect(response.id).toBeDefined();
	});
});
