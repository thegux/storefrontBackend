import { Request, Response } from 'express';
import UserTable, { User } from '../models/users';
import jwt from 'jsonwebtoken';

const store = new UserTable();

export const index = async (req: Request, res: Response) => {
	const jwtSecret = process.env.BCRYPT_PASSWORD || '';

	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(' ')[1] || '';
		jwt.verify(token, jwtSecret);
	} catch (error) {
		res.status(401);
		res.json({ error });
		return;
	}

	const users = await store.index();
	res.json(users);
};

export const show = async (req: Request, res: Response) => {
	const jwtSecret = process.env.BCRYPT_PASSWORD || '';

	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(' ')[1] || '';
		jwt.verify(token, jwtSecret);
	} catch (error) {
		res.status(401);
		res.json({ error });
		return;
	}

	const user = await store.show(parseInt(req.params.id));
	res.json({username: user.username, id: user.id, firstName: user.first_name, lastName: user.last_name});
};

export const create = async (req: Request, res: Response) => {
	const jwtSecret = process.env.BCRYPT_PASSWORD || '';
	
	const user: User = {
		username: req.body.username,
		password: req.body.password,
		first_name: req.body.firstName || '',
		last_name: req.body.lastName || '',
	};

	try {
		const newUser = await store.create(user);
		const token = jwt.sign({ user: newUser }, jwtSecret);
		res.json({username: newUser.username, id: newUser.id, firstName: newUser.first_name, lastName: newUser.last_name, token});
	} catch (error) {
		res.status(400);
		res.json({ error, user });
	}
};

export const authenticate = async (req: Request, res: Response) => {
	const user: User = {
		username: req.body.username,
		password: req.body.password,
	};

	const jwtSecret = process.env.BCRYPT_PASSWORD || '';

	try {
		const authenticated_user = await store.authenticate(user.username, user.password);
		const token = jwt.sign({ user: authenticated_user?.password }, jwtSecret);
		res.json({token, id: authenticated_user?.id});
	} catch (error) {
		res.status(400);
		res.json({ error });
	}
};
