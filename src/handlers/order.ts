import express, { Request, Response } from 'express'
import OrderTable, { Order } from '../models/orders'
import jwt from "jsonwebtoken"

const store = new OrderTable();

const orderRoutes = (app: express.Application) => {
    app.get('/orders/{:id}', show);
    app.post('/orders', create);
  
}

const show = async(req: Request, res: Response) => {
    const order = await store.show(req.body.id);
    res.json(order);
}

const create = async(req: Request, res: Response) => {

    const jwtSecret = process.env.BCRYPT_PASSWORD || "";

    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || "";
        jwt.verify(token, jwtSecret);
    } catch (error) {
        res.status(401);
        res.json({error});
        return
    }

    try {
        const order:Order = {
            status: req.body.status,
            user_id: req.body.userId
        }

        const newOrder = await store.create(order.status, order.user_id);
        res.json(newOrder);
    } catch(error) {
        res.status(400);
        res.json(`Could not create order, error: ${error}`);
    }

}

export default orderRoutes;
