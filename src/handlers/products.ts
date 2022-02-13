import {Response, Request} from 'express';
import ProductTable, {Product} from '../models/products';
import jwt from "jsonwebtoken";

const store = new ProductTable();

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
        const product : Product = {
            name : req.body.name,
            price : req.body.price
        }
        const newProduct = await store.create(product);
        res.json(newProduct)

    } catch(error) {
        res.status(400);
        res.json({error});
    }
}
