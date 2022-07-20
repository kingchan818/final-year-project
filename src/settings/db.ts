import { createConnection, Connection, ConnectionManager } from 'typeorm';
import { classArray } from '../apis/models';
import * as dotenv from 'dotenv';
dotenv.config();
const connectionManager = new ConnectionManager();

export const connection = connectionManager.create({
    type: 'mysql',
    host: 'static.filminal.io',
    port: 3306,
    username: 'calvin',
    password: `${process.env.MYSQL_CLOUD}`,
    database: 'defaultdb',
    entities: [...classArray],
    synchronize: true,
    logging: true,
    // dropSchema : true
});

export const initDB = async () => {
    try {
        await connection.connect();
        console.log('Connection has been established successfully 🚀🚀🧑‍💻🚀🚀');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
