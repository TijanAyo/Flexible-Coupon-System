import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const DB_NAME: string = process.env.DB_NAME || '';
const DB_USERNAME: string = process.env.DB_USERNAME || '';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
const DB_HOST: string = process.env.DB_HOST || '';

// TODO: Change to production database
export const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306
});

async function main(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.info('Connection has been established successfully.');

        await sequelize.sync();
        console.info('Database synced');
    } catch (err:any) {
        // TODO: Use logger package
        console.error("Error:", err);
    }
}

export default main;
