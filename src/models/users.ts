import Client from '../database';
import bcrypt from 'bcrypt';

// Defining types
export type User = {
	id?: number;
	first_name?: string;
	last_name?: string;
	password: string;
	username: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = String(process.env.SALT_ROUNDS);

export default class UserTable {
	//index - gel all Users method
	async index(): Promise<User[]> {
		try {
			const databaseConnection = await Client.connect();
			const sql = 'SELECT * FROM users';
			const result = await databaseConnection.query(sql);
			databaseConnection.release();

			return result.rows;
		} catch (e) {
			throw new Error(`Cannot get users ${e}`);
		}
	}

	//show - get single user method
	async show(id: string): Promise<User> {
		try {
			const databaseConnection = await Client.connect();
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const result = await databaseConnection.query(sql, [id]);
			databaseConnection.release();

			return result.rows[0];
		} catch (e) {
			throw new Error(`Could not find user ${id}. Error ${e}`);
		}
	}

	//create - add single users
	async create(newUser: User): Promise<User> {
		try {
			const hash = bcrypt.hashSync(
				newUser.password + pepper,
				parseInt(saltRounds)
			);

			const databaseConnection = await Client.connect();
			const sql =
				'INSERT INTO users (first_name, last_name, password, username) VALUES($1,$2,$3) RETURNING *';
			const result = await databaseConnection.query(sql, [
				newUser.first_name,
				newUser.last_name,
				hash,
				newUser.username,
			]);
			databaseConnection.release();

			return result.rows[0];
		} catch (e) {
			throw new Error(
				`Could not add new user ${newUser.first_name}. Error ${e}`
			);
		}
	}

	// authenticate
	async authenticate(username: string, password: string): Promise<User | null> {
		const databaseConnection = await Client.connect();
		const sql = 'SELECT password FROM users WHERE username=($1)';

		const result = await databaseConnection.query(sql, [username]);

		if (result.rows.length) {
			const user = result.rows[0];
			if (bcrypt.compareSync(password + pepper, user.password)) {
				return user;
			}
		}

		return null;
	}
}
