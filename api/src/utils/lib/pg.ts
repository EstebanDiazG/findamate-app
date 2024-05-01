import { Pool } from 'pg';
import {
  dbHost,
  dbUser,
  dbPassword,
  dbName,
  dbPort,
} from '../functions/config';

const pool = new Pool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});

export default pool;
