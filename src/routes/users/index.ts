import express from 'express';

const users = express.Router();

users.get('/', (req: express.Request, res: express.Response) => {
    res.send("Welcome to user's routes");
})

// (READ / INDEX) - GET ALL
users.get('/index', (req: express.Request, res: express.Response) => {
    res.send("This route should read all users");
});

// (READ / SHOW) - GET SINGLE USER
users.get('/show', (req: express.Request, res: express.Response) => {
    res.send("This route should read a single user");
});

// (POST / CREATE) - CREATE A USER
users.post('/create', (req: express.Request, res: express.Response) => {
    res.send("This route should create an user");
});

export default users;