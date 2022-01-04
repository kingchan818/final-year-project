import {createConnection, Connection} from "typeorm";
import { classArray } from "../apis/models";
import * as dotenv from 'dotenv'
dotenv.config()
export const initDB = async()=>{
    try{
        const connection :Connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: `${process.env.MYSQL_PASSWORD}`,
            database: "fyp_test",
            entities: [...classArray],
            synchronize: true,
        });
        console.log('Connection has been established successfully.');
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
