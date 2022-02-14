import express from 'express';
import { addProduct, show } from '../../handlers/order';

const orders = express.Router();

// (READ / SHOW) - GET SINGLE ORDER
orders.get('/{:id}', show);

// (POST / CREATE) - CREATE AN ORDER
orders.post('/create', addProduct);


export default orders;