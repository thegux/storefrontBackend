import express from 'express';
import { authenticate, create, index, show } from '../../handlers/users';

const users = express.Router();

// (READ / INDEX) - GET ALL
users.get('/', index);

// (READ / SHOW) - GET SINGLE USER
users.get('/show', show);

// (POST / CREATE) - CREATE A USER
users.post('/create', create);

// (POST / AUTHENTICATE)
users.post('/authenticate', authenticate);

export default users;
