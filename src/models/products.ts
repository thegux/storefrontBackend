import Client from '../database'

// Defining types
export type Product = {
    id: number,
    name: string,
    price: number,
}

export default class ProductTable {

    //index - gel all products method
    async index():Promise<Product[]> {
        try {
            const databaseConnection = await Client.connect();
            const sql = "SELECT * FROM products";
            const result = await databaseConnection.query(sql);
            databaseConnection.release();

            return result.rows;
        } catch (e) {
            throw new Error(`Cannot get users ${e}`)
        }
    }

    //show - get single product method
    async show(id: string):Promise<Product> {
        try {
            const databaseConnection = await Client.connect();
            const sql = "SELECT * FROM products WHERE id=($1)";
            const result = await databaseConnection.query(sql, [id]);
            databaseConnection.release();

            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not find product ${id}. Error ${e}`)
        }
    }


    //create - add single products
    async create(pd: Product):Promise<Product> {
        try {
            const databaseConnection = await Client.connect();
            const sql = "INSERT INTO products (name, price) VALUES($1,$2) RETURNING *";
            const result = await databaseConnection.query(sql, [pd.name, pd.price]);
            databaseConnection.release();

            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not add new product ${pd.name}. Error ${e}`)
        }
    }

}