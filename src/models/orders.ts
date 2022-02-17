import Client from '../database/index';
import { validateOrderStatus } from '../helpers/validators';

export type Order = {
	id?: number;
	status: string;
	user_id: number;
};

export type OrderProduct = {
	id?: number;
	order_id: number;
	product_id: number;
	quantity: number;
};

export default class OrderTable {
	async show(userId: number): Promise<Order> {
		try {
			const databaseConnection = await Client.connect();
			const sql = 'SELECT * from orders where user_id=($1)';
			const result = await databaseConnection.query(sql, [userId]);
			const latestOrder = result.rows[result.rows.length - 1];

			//get products from order
			const sql_products =
				'SELECT product_id, quantity, price, name FROM products INNER JOIN order_products ON order_products.order_id=($1) AND products.id = order_products.product_id';
			const products = await databaseConnection.query(sql_products, [
				latestOrder.id,
			]);
			databaseConnection.release();
			return { ...latestOrder, products: products.rows };
		} catch (error) {
			console.log(`PEDIDO REQUISITADO`, userId);
			throw new Error(`Could not get order with id: ${userId}, ${error}`);
		}
	}

	async create(status: string, userId: number): Promise<Order> {
		try {
			validateOrderStatus(status);
			const databaseConnection = await Client.connect();
			const sql =
				'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
			const result = await databaseConnection.query(sql, [status, userId]);
			databaseConnection.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(`Could not create order, error: ${error}`);
		}
	}

	async addProduct(
		quantity: number,
		orderId: number,
		productId: number
	): Promise<OrderProduct> {
		try {
			const sql =
				'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
			const databaseConnection = await Client.connect();
			const result = await databaseConnection.query(sql, [
				quantity,
				orderId,
				productId,
			]);
			databaseConnection.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Could not add product ${productId} to order ${orderId}, error: ${error}`
			);
		}
	}
}
