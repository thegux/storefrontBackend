import express from 'express';
import orders from './orders';
import users from './users';
import products from './products';

const routes = express.Router();

routes.get('/api', (req: express.Request, res: express.Response) => {
	res.send('Welcome to the API');
});

routes.use('/orders', orders);
routes.use('/users', users);
routes.use('/products', products);

export default routes;
