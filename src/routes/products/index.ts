import express from 'express';

const products = express.Router();

products.get('/', (req: express.Request, res: express.Response) => {
    res.send("Welcome to product's routes");
})


// (READ / INDEX) - GET ALL
products.get('/index', (req: express.Request, res: express.Response) => {
    res.send("This route should read all products");
});

// (READ / SHOW) - GET SINGLE PRODUCT
products.get('/show', (req: express.Request, res: express.Response) => {
    res.send("This route should read a single product");
});

// (POST / CREATE) - CREATE A PRODUCT
products.post('/create', (req: express.Request, res: express.Response) => {
    res.send("This route should create a product");
});




export default products;