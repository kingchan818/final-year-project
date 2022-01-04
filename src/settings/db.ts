import { Sequelize } from 'sequelize';


export const initDB = ()=>{
    const sequelize = new Sequelize('mysql://root:S070008s@localhost:3306/fyp_test')
    const test = async()=>{
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    test()
}
