import express from 'express';
import { addProduct, create, show } from '../../handlers/order';

const orders = express.Router();

// (READ / SHOW) - GET SINGLE ORDER
orders.get('/:userId', show);

// (POST / CREATE) - CREATE AN ORDER
orders.post('/create', create);

// (POST / CREATE) - CREATE AN ORDER
orders.post('/add', addProduct);

export default orders;
