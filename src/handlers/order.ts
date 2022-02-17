import { Request, Response } from 'express';
import OrderTable, { Order, OrderProduct } from '../models/orders';
import jwt from 'jsonwebtoken';

const store = new OrderTable();

export const show = async (req: Request, res: Response) => {
	const order = await store.show(parseInt(req.params.id));
	res.json(order);
};

export const create = async (req: Request, res: Response) => {
	const jwtSecret = process.env.BCRYPT_PASSWORD || '';

	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(' ')[1] || '';
		jwt.verify(token, jwtSecret);
	} catch (error) {
		res.status(401);
		res.json({ error });
		return;
	}

	try {
		const order: Order = {
			status: req.body.status,
			user_id: req.body.userId,
		};

		const newOrder = await store.create(order.status, order.user_id);
		res.json(newOrder);
	} catch (error) {
		res.status(400);
		res.json(`Could not create order, error: ${error}`);
	}
};

export const addProduct = async (req: Request, res: Response) => {
	const jwtSecret = process.env.BCRYPT_PASSWORD || '';

	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(' ')[1] || '';
		jwt.verify(token, jwtSecret);
	} catch (error) {
		res.status(401);
		res.json({ error });
		return;
	}

	try {
		const orderProduct: OrderProduct = {
			quantity: req.body.quantity,
			order_id: req.body.orderId,
			product_id: req.body.productId,
		};
		const updatedOrder = await store.addProduct(
			orderProduct.quantity,
			orderProduct.order_id,
			orderProduct.product_id
		);
		res.json(updatedOrder);
	} catch (error) {
		res.status(400);
		res.json(`Could not add product, error: ${error}`);
	}
};
