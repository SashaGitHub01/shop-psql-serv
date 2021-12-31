import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

//@ts-ignore
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: process.env.DB_HOST,
   port: process.env.DB_PORT as unknown as number,
   dialect: 'postgres'
})