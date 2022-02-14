import express from 'express';
import { create, index, show } from '../../handlers/products';

const products = express.Router();


// (READ / INDEX) - GET ALL
products.get('/', index);

// (READ / SHOW) - GET SINGLE PRODUCT
products.get('/{:id}', show);

// (POST / CREATE) - CREATE A PRODUCT
products.post('/create', create);




export default products;