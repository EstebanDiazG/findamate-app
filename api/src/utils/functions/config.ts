import cnf from 'dotenv';

cnf.config();

const apiPort = parseInt(process.env.API_PORT || '3000');

const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbName = process.env.DB_NAME || 'postgres';
const dbPort = parseInt(process.env.DB_PORT || '5432');

export { apiPort, dbHost, dbUser, dbPassword, dbName, dbPort };
