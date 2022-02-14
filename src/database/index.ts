import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();
 
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_PASSWORD,
    ENV,
} = process.env;


const poolOptions = {
    host: POSTGRES_HOST,
    database: ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: ENV === "dev" ? POSTGRES_PASSWORD : POSTGRES_TEST_PASSWORD,
}


const database = new Pool(poolOptions);

export default database;