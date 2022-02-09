import express from 'express';

const orders = express.Router();

orders.get('/', (req: express.Request, res: express.Response) => {
    res.send("Welcome to order's routes");
})

// (READ / SHOW) - GET SINGLE ORDER
orders.get('/show', (req: express.Request, res: express.Response) => {
    res.send("This route should read a single order");
});

// (POST / CREATE) - CREATE AN ORDER
orders.post('/create', (req: express.Request, res: express.Response) => {
    res.send("This route should create an order");
});


export default orders;