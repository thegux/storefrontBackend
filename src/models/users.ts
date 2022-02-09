import Client from '../database'

// Defining types
export type User = {
    id: number,
    first_name: string,
    last_name: string,
    password: string,
}

export default class UserTable {

    //index - gel all Users method
    async index():Promise<User[]> {
        try {
            const databaseConnection = await Client.connect();
            const sql = "SELECT * FROM users";
            const result = await databaseConnection.query(sql);
            databaseConnection.release();

            return result.rows;
        } catch (e) {
            throw new Error(`Cannot get users ${e}`)
        }
    }

    //show - get single user method
    async show(id: string):Promise<User> {
        try {
            const databaseConnection = await Client.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const result = await databaseConnection.query(sql, [id]);
            databaseConnection.release();

            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not find user ${id}. Error ${e}`)
        }
    }


    //create - add single users
    async create(newUser: User):Promise<User> {
        try {
            const databaseConnection = await Client.connect();
            const sql = "INSERT INTO users (name, price) VALUES($1,$2) RETURNING *";
            const result = await databaseConnection.query(sql, [newUser.first_name, newUser.last_name]);
            databaseConnection.release();

            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not add new user ${newUser.first_name}. Error ${e}`)
        }
    }

}