import {createConnection, Connection,ConnectionManager} from "typeorm";
import {classArray} from '../apis/models'
import * as dotenv from 'dotenv'
dotenv.config()
const connectionManager = new ConnectionManager();
export const connection = connectionManager.create({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: `${process.env.MYSQL_PASSWORD}`,
    database: "fyp_test",
    entities: [...classArray],
    synchronize: true,
    logging: true,
})

export const initDB = async()=>{
    try{
        await connection.connect()
        console.log('Connection has been established successfully 🚀🚀🧑‍💻🚀🚀');
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
