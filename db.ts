import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('shop_db', 'postgres', '123456', {
   host: 'localhost',
   port: 5432,
   dialect: 'postgres'
})