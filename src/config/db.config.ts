import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import {logger} from "../helper";

dotenv.config();

const DB_NAME: string = process.env.DB_NAME || '';
const DB_USERNAME: string = process.env.DB_USERNAME || '';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
const DB_HOST: string = process.env.DB_HOST || '';

export const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    port: 5432
});

async function main(): Promise<void> {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');

        await sequelize.sync();
        logger.info('Database synced');
    } catch (err:any) {
        logger.error("Error:", err);
    }
}

export default main;
